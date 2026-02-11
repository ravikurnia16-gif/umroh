import React, { useEffect, useState, useRef } from 'react';
import { useInView, motion, animate } from 'framer-motion';

const StatCounter = ({ from, to, label, prefix = "", suffix = "" }) => {
    const nodeRef = useRef();
    const inView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (inView) {
            const node = nodeRef.current;
            const controls = animate(from, to, {
                duration: 2,
                onUpdate(value) {
                    node.textContent = `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
                }
            });
            return () => controls.stop();
        }
    }, [from, to, inView, prefix, suffix]);

    return (
        <div className="text-center">
            <div
                ref={nodeRef}
                className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2 font-serif"
            >
                {prefix}{from}{suffix}
            </div>
            <div className="text-slate-500 font-medium uppercase tracking-wide text-sm">{label}</div>
        </div>
    );
};

export default StatCounter;
