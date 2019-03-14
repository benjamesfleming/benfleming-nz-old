#!/bin/bash
npm ci
npm run build
pm2 start npm --name BenFlemingIO -- start