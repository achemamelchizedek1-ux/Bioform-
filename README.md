# 🧬 BioSync Aggregator
## AI-Powered Unified Query Across 6 Biological Databases

A full-stack zero-dependency application that aggregates real-time metrics from 6 major biological databases (NCBI, PIR-PDB, POPSET, BMBL, GENBANK, DDBJ) and synthesizes results using a simulated AI accumulator.

---

## 📋 Features

✅ **Zero Dependencies** — Pure Node.js backend, vanilla HTML/CSS/JS frontend
✅ **6-Database Aggregation** — NCBI, PIR-PDB, POPSET, BMBL, GENBANK, DDBJ
✅ **AI Synthesis** — Unified research abstract, cross-references, safety ratings
✅ **Dark-Mode UI** — Light blue, black, and purple color scheme
✅ **Real-time Metrics** — 6-pane responsive grid displaying database statistics
✅ **AI Terminal** — Interactive terminal showing synthesized research findings
✅ **Instant Deploy** — Single command to run both backend and frontend

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14+ (no npm packages required)
- **Modern browser** (Chrome, Firefox, Edge, Safari)

### Setup

1. **Download files:**
   - `server.js` — Node.js backend server
   - `index.html` — Frontend single-page application

2. **Start the backend:**
   ```bash
   node server.js
   ```
   You should see:
   ```
   🧬 Bio-Database Aggregator running on http://localhost:3000
      POST /api/accumulate to query all 6 databases
      GET /health to check server status
   ```

3. **Open the frontend:**
   - **Option A:** Double-click `index.html` to open in your default browser
   - **Option B:** Open `file:///path/to/index.html` in your browser address bar
   - **Option C:** Serve via Python: `python3 -m http.server 8000` (then visit `http://localhost:8000`)

4. **Make a query:**
   - Enter a biological term (e.g., "BRCA1", "COVID-19", "Arabidopsis")
   - Click "QUERY DATABASES" or press Enter
   - Watch as data flows from all 6 databases and gets synthesized

---

## 🏗️ Architecture

### Backend (`server.js`)

**Pure Node.js HTTP Server** — No external dependencies

#### Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/accumulate` | POST | Query all 6 databases and run AI synthesis |
| `/health` | GET | Server health check |

#### Database Mock Generators

Each database generates realistic mock data:

- **NCBI** — Sequence records, organism coverage, response time
- **PIR-PDB** — Protein structures, resolution metrics, determination methods
- **POPSET** — Population sets, genetic markers, diversity indices
- **BMBL** — Biosafety records, hazard classification, containment levels
- **GENBANK** — Sequence counts, basepair totals, organism diversity
- **DDBJ** — Entry counts, data holdings, synchronization status

#### AI Accumulator Function

```javascript
runAIAccumulator(query, databaseResults)
  ↓
  Aggregates metrics from all 6 sources
  ↓
  Generates unified abstract (plain English)
  ↓
  Compiles cross-database references
  ↓
  Calculates BMBL safety rating
  ↓
  Returns JSON with synthesis
```

### Frontend (`index.html`)

**Single-Page Application** — Vanilla JavaScript, responsive design

#### Sections

1. **Header** — Title and description
2. **Search Bar** — Query input with animated button
3. **Database Grid** — 6 panes (one per database)
   - Real-time metrics
   - Status indicators
   - Color-coded tags
   - Hover animations
4. **AI Terminal** — Synthesized research output
   - Abstract section
   - Cross-reference matrix
   - Safety badge
   - Confidence bar

#### Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| **Light Blue** | `#00d4ff` | Primary accent, highlights |
| **Purple** | `#9945ff` | Secondary accent, borders |
| **Black** | `#0a0e27` | Main background |
| **Dark** | `#1a1f3a` | Card backgrounds |

---

## 📊 Request/Response Example

### Request

```bash
curl -X POST http://localhost:3000/api/accumulate \
  -H "Content-Type: application/json" \
  -d '{"query": "BRCA1 tumor suppressor"}'
```

### Response (Simplified)

```json
{
  "success": true,
  "query": "BRCA1 tumor suppressor",
  "databases": {
    "ncbi": {
      "database": "NCBI",
      "records_found": 3456,
      "species_coverage": ["Homo sapiens", "Canis lupus"],
      "sequence_type": ["DNA", "Protein"],
      "response_time_ms": 87,
      "metadata": {
        "description": "NCBI GenBank entries for query: \"BRCA1 tumor suppressor\"",
        "confidence": 0.92
      }
    },
    "pirpdb": { /* ... */ },
    "popset": { /* ... */ },
    "bmbl": { /* ... */ },
    "genbank": { /* ... */ },
    "ddbj": { /* ... */ }
  },
  "ai_synthesis": {
    "abstract": "This comprehensive search across six major biological databases identified...",
    "cross_references": [
      {
        "source": "NCBI → PIR-PDB",
        "link_count": 287,
        "description": "Sequence-to-structure mappings"
      },
      /* ... more cross-refs ... */
    ],
    "bmbl_safety_rating": "Safe (BSL-1)",
    "overall_confidence": "89.2%",
    "total_records_aggregated": "12,456",
    "synthesis_timestamp": "2025-03-16T14:32:45.123Z",
    "databases_queried": 6,
    "query_analyzed": "BRCA1 tumor suppressor"
  },
  "timestamp": "2025-03-16T14:32:45.123Z"
}
```

---

## 🎨 UI Components

### Database Cards
- **Header** with icon, name, and status badge
- **Metrics display** showing database-specific KPIs
- **Hover effects** with gradient shimmer
- **Responsive layout** adapts to screen size

### Search Bar
- **Icon prefix** with magnifying glass
- **Gradient button** with glow effect
- **Loading state** with spinning animation
- **Enter key support** for quick queries

### AI Terminal
- **Header** with status indicator
- **Scrollable body** with custom scrollbar
- **Type-in animation** for synthesis lines
- **Color-coded output** (success, error, warning, dim)
- **Abstract section** with left border accent
- **Cross-reference matrix** with link counts
- **Safety badge** with gradient background
- **Confidence bar** with animated fill

---

## 🛠️ Customization

### Change Color Scheme

Edit CSS variables in `index.html`:

```css
:root {
  --color-light-blue: #00d4ff;   /* Change primary accent */
  --color-purple: #9945ff;       /* Change secondary accent */
  --color-black: #0a0e27;        /* Change background */
}
```

### Modify Database Generators

Edit generator functions in `server.js`:

```javascript
function generateMockNCBI(query) {
  return {
    database: 'NCBI',
    records_found: Math.floor(Math.random() * 5000) + 100,
    // ... customize fields ...
  };
}
```

### Change AI Synthesis Logic

Edit `runAIAccumulator()` in `server.js` to customize:
- Abstract generation
- Cross-reference compilation
- Safety rating calculation
- Confidence scoring

### Add More Databases

1. Create a new generator function:
   ```javascript
   function generateMockNEWDB(query) { /* ... */ }
   ```

2. Add to database config in frontend (`index.html`):
   ```javascript
   const databases = [
     // ... existing databases ...
     { id: 'newdb', name: 'NEWDB', icon: '🔬', color: 'light-blue' }
   ];
   ```

3. Include in accumulator response:
   ```javascript
   const databaseResults = {
     ncbi: generateMockNCBI(query),
     // ... other databases ...
     newdb: generateMockNEWDB(query)
   };
   ```

---

## 📱 Responsive Design

- **Desktop (1200px+)** — 3-column database grid
- **Tablet (768px-1199px)** — 2-column grid
- **Mobile (<768px)** — Single column grid
- **Touch-optimized** buttons and inputs
- **Fluid typography** using CSS `clamp()`

---

## ⚡ Performance

- **No build step** — Direct execution
- **No dependencies** — Minimal overhead
- **Zero JavaScript frameworks** — Vanilla DOM manipulation
- **CSS animations** — GPU-accelerated transforms
- **Optimized scrolling** — Hardware-accelerated scrollbar
- **CORS enabled** — Cross-origin requests supported

---

## 🐛 Troubleshooting

### "Connection failed: Failed to fetch"

**Problem:** Frontend can't reach backend on `http://localhost:3000`

**Solutions:**
1. Ensure `node server.js` is running
2. Check that no other service is using port 3000
3. If serving frontend from different domain, CORS headers are enabled (they are by default)

### "This site can't be reached"

**Problem:** Frontend won't load

**Solutions:**
1. If using file protocol: Ensure `index.html` is in correct directory
2. If using web server: Verify server is running and port is accessible
3. Try: `python3 -m http.server 8000` to serve with built-in HTTP server

### Database cards show no data

**Problem:** API response didn't populate

**Solutions:**
1. Check browser console for JavaScript errors (F12)
2. Check Network tab to see actual API response
3. Ensure query is not empty
4. Try refreshing the page

### Port 3000 already in use

**Problem:** Address already in use error when starting server

**Solutions:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port (modify server.js):
const PORT = 3001;
```

---

## 📚 API Reference

### POST /api/accumulate

Queries all 6 databases and returns synthesized results.

**Request Body:**
```json
{
  "query": "string (biological search term)"
}
```

**Response:**
```json
{
  "success": boolean,
  "query": string,
  "databases": {
    "ncbi": { /* database response */ },
    "pirpdb": { /* database response */ },
    "popset": { /* database response */ },
    "bmbl": { /* database response */ },
    "genbank": { /* database response */ },
    "ddbj": { /* database response */ }
  },
  "ai_synthesis": {
    "abstract": string,
    "cross_references": Array<{
      "source": string,
      "link_count": number,
      "description": string
    }>,
    "bmbl_safety_rating": string,
    "overall_confidence": string,
    "total_records_aggregated": string,
    "synthesis_timestamp": string (ISO 8601),
    "databases_queried": number,
    "query_analyzed": string
  },
  "timestamp": string (ISO 8601)
}
```

### GET /health

Server health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-03-16T14:32:45.123Z"
}
```

---

## 📖 Example Queries

Try these biological queries:

- **Gene:** `BRCA1`, `TP53`, `EGFR`
- **Virus:** `SARS-CoV-2`, `HIV`, `Influenza`
- **Organism:** `Arabidopsis thaliana`, `Escherichia coli`, `Homo sapiens`
- **Disease:** `Type 2 diabetes`, `Alzheimer's`, `Cancer`
- **Protein:** `Insulin`, `Hemoglobin`, `Antibody`
- **Mutation:** `G12C RAS`, `BCR-ABL fusion`

---

## 🔐 Security Notes

- ⚠️ **No authentication** — This is a demo application
- ⚠️ **No input validation** — Assumes trusted queries
- ⚠️ **Mock data only** — Does not connect to real databases
- ✅ **CORS enabled** — Safe for cross-origin requests
- ✅ **No database writes** — Read-only operations

For production use, implement:
- Input validation and sanitization
- Rate limiting
- Authentication/authorization
- HTTPS encryption
- Query logging
- Real database integration

---

## 📄 License

Public Domain — Use freely for educational and research purposes.

---

## 🎓 Educational Value

This application demonstrates:

- **Zero-dependency architecture** — Pure Node.js & vanilla JS
- **REST API design** — Clean request/response patterns
- **Multi-source aggregation** — Combining data from multiple sources
- **AI synthesis simulation** — Creating unified output from disparate inputs
- **Responsive UI design** — Modern dark-mode interface
- **CSS animations** — Smooth visual effects
- **Cross-origin requests** — CORS handling
- **DOM manipulation** — Dynamic element creation and updates
- **Error handling** — Graceful failure states

---

## 📞 Support

For issues or questions:
1. Check the **Troubleshooting** section above
2. Review **Network** tab in browser DevTools (F12)
3. Check server console for error messages
4. Verify both `server.js` and `index.html` are in the same or accessible directories

---

**Created:** March 16, 2025
**Version:** 1.0.0
**Status:** Production-Ready Demo
