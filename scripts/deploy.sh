#!/bin/bash
branch_name="$(git symbolic-ref HEAD 2>/dev/null)"
branch_name=${branch_name##refs/heads/}

pm2 delete "BenFlemingIO:${branch_name}"

npm ci
npm run build

pm2 start npm --name "BenFlemingIO:${branch_name}" -- start