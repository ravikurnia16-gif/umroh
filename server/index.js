const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// 1. Diagnostics (Run immediately)
const staticPath = path.resolve(__dirname, '../dist');
console.log('--- Startup Diagnostics ---');
console.log(`📂 Current Dir: ${__dirname}`);
console.log(`📁 Static Path: ${staticPath}`);
if (fs.existsSync(staticPath)) {
    console.log('✅ Static directory found. Contents:');
    const listFiles = (dir, depth = 0) => {
        if (depth > 1) return;
        try {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const stats = fs.statSync(path.join(dir, file));
                console.log(`${'  '.repeat(depth)}${stats.isDirectory() ? '📂' : '📄'} ${file}`);
                if (stats.isDirectory()) listFiles(path.join(dir, file), depth + 1);
            });
        } catch (e) { }
    };
    listFiles(staticPath);
} else {
    console.error('❌ Static directory NOT found');
}
console.log('---------------------------');

// 2. Global Middleware
app.use(cors());
app.use(express.json());

// 3. Request Logger (Top level)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString().split('T')[1].split('.')[0]}] ${req.method} ${req.url}`);
    next();
});

// 4. Static Assets (Serve from /dist)
app.use(express.static(staticPath));

// 5. API Routes
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', port: PORT, db: 'connected' });
});

app.get('/api/packages', asyncHandler(async (req, res) => {
    const { maxPrice, duration, travel_id, sort, q } = req.query;
    let where = {};
    if (maxPrice) where.price = { lte: parseInt(maxPrice) };
    if (travel_id) where.travelId = parseInt(travel_id);
    if (q) {
        where.OR = [{ title: { contains: q } }];
    }
    if (duration) {
        if (duration === '<9') where.duration = { lt: 9 };
        else if (duration === '9-12') where.duration = { gte: 9, lte: 12 };
        else if (duration === '>12') where.duration = { gt: 12 };
    }
    let orderBy = {};
    if (sort === 'lowest') orderBy.price = 'asc';
    else if (sort === 'highest') orderBy.price = 'desc';
    else if (sort === 'rating') orderBy.rating = 'desc';

    const packages = await prisma.package.findMany({
        where, orderBy, include: { travel: true }
    });
    res.json(packages);
}));

app.get('/api/packages/:id', asyncHandler(async (req, res) => {
    const pkg = await prisma.package.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { travel: true }
    });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
}));

app.get('/api/travels', asyncHandler(async (req, res) => {
    res.json(await prisma.travelAgent.findMany());
}));

app.get('/api/travels/:id', asyncHandler(async (req, res) => {
    const travel = await prisma.travelAgent.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { packages: true }
    });
    if (!travel) return res.status(404).json({ message: 'Travel agent not found' });
    res.json(travel);
}));

app.get('/api/promos', asyncHandler(async (req, res) => {
    res.json(await prisma.promo.findMany({ where: { isActive: true } }));
}));

app.get('/api/articles', asyncHandler(async (req, res) => {
    res.json(await prisma.article.findMany());
}));

app.get('/api/faq', asyncHandler(async (req, res) => {
    res.json(await prisma.faq.findMany());
}));

app.get('/api/reviews', asyncHandler(async (req, res) => {
    res.json(await prisma.review.findMany());
}));

// 6. SPA Catch-all (EVERYTHING else serves index.html)
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    // If request is for a file (has .), and express.static didn't catch it, it's a 404
    if (req.path.includes('.')) return next();

    console.log(`[SPA] Serving index.html for ${req.url}`);
    res.sendFile(path.join(staticPath, 'index.html'));
});

// 7. Final Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
});

// 8. Start Server
async function startServer() {
    console.log(`⌛ Connecting to Database...`);
    try {
        await prisma.$connect();
        console.log('✅ Connected to Database successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log('-------------------------------------------');
        console.log(`🚀 Server started on port ${PORT}`);
        console.log(`🌐 Health check: /api/health`);
        console.log('-------------------------------------------');
    });
}

startServer();
