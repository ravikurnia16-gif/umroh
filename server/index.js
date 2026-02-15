const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Helper to handle errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        time: new Date().toISOString(),
        env: process.env.NODE_ENV,
        port: PORT
    });
});

// Get all packages
app.get('/api/packages', asyncHandler(async (req, res) => {
    const { maxPrice, duration, travel_id, sort, q } = req.query;

    let where = {};

    if (maxPrice) where.price = { lte: parseInt(maxPrice) };
    if (travel_id) where.travelId = parseInt(travel_id);
    if (q) {
        where.OR = [
            { title: { contains: q } },
            // { travel: { name: { contains: q } } } // Prisma doesn't support deep nested filter easily on simple connect
        ];
    }

    // Duration filter logic (simplified for Prisma)
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
        where,
        orderBy,
        include: { travel: true }
    });

    res.json(packages);
}));

// Get package by ID
app.get('/api/packages/:id', asyncHandler(async (req, res) => {
    const pkg = await prisma.package.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { travel: true }
    });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
}));

// Get all travels
app.get('/api/travels', asyncHandler(async (req, res) => {
    const travels = await prisma.travelAgent.findMany();
    res.json(travels);
}));

// Get travel by ID
app.get('/api/travels/:id', asyncHandler(async (req, res) => {
    const travel = await prisma.travelAgent.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { packages: true }
    });
    if (!travel) return res.status(404).json({ message: 'Travel agent not found' });
    res.json(travel);
}));

// Get promos
app.get('/api/promos', asyncHandler(async (req, res) => {
    const promos = await prisma.promo.findMany({
        where: { isActive: true }
    });
    res.json(promos);
}));

// Get articles
app.get('/api/articles', asyncHandler(async (req, res) => {
    const articles = await prisma.article.findMany();
    res.json(articles);
}));

// Get FAQ
app.get('/api/faq', asyncHandler(async (req, res) => {
    const faq = await prisma.faq.findMany();
    res.json(faq);
}));

// Get reviews
app.get('/api/reviews', asyncHandler(async (req, res) => {
    const reviews = await prisma.review.findMany();
    res.json(reviews);
}));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Check static path on startup
const staticPath = path.resolve(__dirname, '../dist');
const fs = require('fs');

console.log('--- Startup Diagnostics ---');
console.log(`📂 Current Dir: ${__dirname}`);
console.log(`📁 Static Path: ${staticPath}`);
if (fs.existsSync(staticPath)) {
    console.log('✅ Static directory found');
    if (fs.existsSync(path.join(staticPath, 'index.html'))) {
        console.log('✅ index.html found');
    } else {
        console.error('❌ index.html NOT found in static path');
    }
} else {
    console.error('❌ Static directory NOT found');
}
console.log('---------------------------');

// Request logger for debugging
app.use((req, res, next) => {
    if (!req.url.startsWith('/api')) {
        // console.log(`[Static] ${req.url}`);
    }
    next();
});

// Routes
// (Keep existing API routes here - skipping for brevity in replacement, but ensure they are not deleted)

// Serve React App (Catch-all middleware for SPA)
// Only serve index.html for paths that don't look like files (no dots)
app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path.includes('.')) {
        return next();
    }
    res.sendFile(path.join(staticPath, 'index.html'));
});

// Check database connection on startup (non-blocking)
async function startServer() {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server started on port ${PORT}`);
        console.log(`🌐 Health check: /api/health`);
    });

    try {
        await prisma.$connect();
        console.log('✅ Connected to Database successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.log('⚠️  App will continue to run using fallback data if available.');
    }
}

startServer();
