#!/bin/bash

# Hit first API
curl -X GET https://portal.proconnectlogistics.com/AI/api/data/cache/flush

# Wait for first to complete, then hit second
curl -X GET https://portal.proconnectlogistics.com/AI/api/data/cache/
