/**
 * ============================================================
 * Express.js Server Setup
 * ============================================================
 *
 * Purpose:
 * This file creates a basic Express server with:
 * - Security middleware
 * - Request logging
 * - JSON parsing
 * - Health check endpoint
 * - 404 handling
 * - Global error handling
 * ============================================================
 */

 // ------------------------------------------------------------
// Import Dependencies
// ------------------------------------------------------------

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/db");
// ------------------------------------------------------------
// Create Express Application
// ------------------------------------------------------------
const app = express();
// ------------------------------------------------------------
// Server Configuration
// ------------------------------------------------------------
dotenv.config();
// Server Port
const PORT = process.env.PORT || 3000;

// DB connection
connectDB();
// Application Environment
const NODE_ENV = process.env.NODE_ENV || 'development';

// ------------------------------------------------------------
// Global Middleware
// ------------------------------------------------------------

/**
 * Helmet helps secure Express applications
 * by setting various HTTP headers.
 */
app.use(helmet());
app.use(cors());
/**
 * Morgan logs every incoming request.
 *
 * Example:
 * GET / 200 5ms
 */
app.use(morgan('dev'));

/**
 * Parse JSON request bodies.
 */
app.use(express.json());

/**
 * Parse URL Encoded Form Data.
 */
app.use(
    express.urlencoded({
        extended: true
    })
);

/**
 * Custom Request Logger
 */
app.use((req, res, next) => {
    console.log('----------------------------------------');
    console.log(`Timestamp : ${new Date().toISOString()}`);
    console.log(`Method    : ${req.method}`);
    console.log(`URL       : ${req.originalUrl}`);
    console.log(`IP        : ${req.ip}`);
    console.log('----------------------------------------');

    next();
});
app.use('/api/v1/auth/',require('./routes/authRoutes'));
// ------------------------------------------------------------
// Root Route
// ------------------------------------------------------------

/**
 * GET /
 *
 * Welcome endpoint.
 */
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Express Server Running Successfully',
        environment: NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// ------------------------------------------------------------
// Health Check Endpoint
// ------------------------------------------------------------

/**
 * GET /health
 *
 * Used by:
 * - Monitoring systems
 * - Docker health checks
 * - Kubernetes probes
 * - Load balancers
 */
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        uptime: `${process.uptime().toFixed(2)} seconds`,
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
    });
});

// ------------------------------------------------------------
// 404 Route Handler
// ------------------------------------------------------------

/**
 * Executes when no matching route is found.
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route Not Found',
        requestedUrl: req.originalUrl
    });
});

// ------------------------------------------------------------
// Global Error Handler
// ------------------------------------------------------------

/**
 * Centralized error handling middleware.
 */
app.use((err, req, res, next) => {
    console.error('Server Error:', err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// ------------------------------------------------------------
// Start Express Server
// ------------------------------------------------------------

app.listen(PORT, () => {

    console.log('========================================');
    console.log('Express Server Started Successfully');
    console.log('========================================');
    console.log(`Environment : ${NODE_ENV}`);
    console.log(`Port        : ${PORT}`);
    console.log(`Local URL   : http://localhost:${PORT}`);
    console.log(`Started At  : ${new Date().toISOString()}`);
});
