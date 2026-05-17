const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = 3000;

// ============================================================================
// Mock Database Aggregators (6 sources)
// ============================================================================

function generateMockNCBI(query) {
  return {
    database: 'NCBI',
    status: 'success',
    records_found: Math.floor(Math.random() * 5000) + 100,
    species_coverage: ['Homo sapiens', 'Mus musculus', 'Arabidopsis thaliana'].sort(() => Math.random() - 0.5).slice(0, 2),
    response_time_ms: Math.floor(Math.random() * 200) + 50,
    sequence_type: ['DNA', 'RNA', 'Protein'].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 1),
    last_updated: '2025-03-15',
    metadata: {
      description: `NCBI GenBank entries for query: "${query}"`,
      confidence: 0.92
    }
  };
}

function generateMockPIRPDB(query) {
  return {
    database: 'PIR-PDB',
    status: 'success',
    protein_structures: Math.floor(Math.random() * 2000) + 50,
    resolution_range: `${(Math.random() * 1.5 + 1.2).toFixed(2)} - ${(Math.random() * 2.5 + 2.5).toFixed(2)} Å`,
    organisms: ['Bacteria', 'Archaea', 'Eukarya'].sort(() => Math.random() - 0.5).slice(0, 2),
    response_time_ms: Math.floor(Math.random() * 300) + 100,
    structure_methods: ['X-ray', 'NMR', 'Cryo-EM'].sort(() => Math.random() - 0.5).slice(0, 2),
    last_updated: '2025-03-14',
    metadata: {
      description: `PIR-PDB structures matching: "${query}"`,
      confidence: 0.88
    }
  };
}

function generateMockPOPSET(query) {
  return {
    database: 'POPSET',
    status: 'success',
    population_sets: Math.floor(Math.random() * 800) + 50,
    genetic_markers: Math.floor(Math.random() * 15000) + 1000,
    diversity_metrics: {
      heterozygosity: (Math.random() * 0.4 + 0.3).toFixed(3),
      polymorphic_sites: Math.floor(Math.random() * 2000) + 100
    },
    response_time_ms: Math.floor(Math.random() * 250) + 80,
    geographic_regions: ['Africa', 'Asia', 'Europe', 'Americas'].sort(() => Math.random() - 0.5).slice(0, 3),
    last_updated: '2025-03-13',
    metadata: {
      description: `Population genetics data for: "${query}"`,
      confidence: 0.85
    }
  };
}

function generateMockBMBL(query) {
  return {
    database: 'BMBL',
    status: 'success',
    biosafety_records: Math.floor(Math.random() * 500) + 20,
    hazard_classification: ['BSL-1', 'BSL-2', 'BSL-3'].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 2) + 1),
    safety_protocols: Math.floor(Math.random() * 50) + 10,
    response_time_ms: Math.floor(Math.random() * 180) + 60,
    containment_level: Math.ceil(Math.random() * 3),
    regulatory_status: ['Approved', 'Restricted', 'Experimental'].sort(() => Math.random() - 0.5)[0],
    last_updated: '2025-03-12',
    metadata: {
      description: `BMBL safety assessments for: "${query}"`,
      confidence: 0.94
    }
  };
}

function generateMockGENBANK(query) {
  return {
    database: 'GENBANK',
    status: 'success',
    sequences: Math.floor(Math.random() * 8000) + 200,
    total_bp: Math.floor(Math.random() * 500000000) + 50000000,
    organism_count: Math.floor(Math.random() * 300) + 50,
    response_time_ms: Math.floor(Math.random() * 220) + 70,
    sequence_types: ['mRNA', 'rRNA', 'tRNA', 'genomic'].sort(() => Math.random() - 0.5).slice(0, 3),
    taxonomy_divisions: Math.floor(Math.random() * 10) + 5,
    last_updated: '2025-03-11',
    metadata: {
      description: `GenBank sequence records for: "${query}"`,
      confidence: 0.91
    }
  };
}

function generateMockDDBJ(query) {
  return {
    database: 'DDBJ',
    status: 'success',
    entries: Math.floor(Math.random() * 6000) + 150,
    sequence_length: Math.floor(Math.random() * 300000) + 10000,
    data_holdings: `${(Math.random() * 8 + 2).toFixed(1)} TB`,
    response_time_ms: Math.floor(Math.random() * 280) + 90,
    submission_status: ['Publicly Available', 'Private', 'Hold'].sort(() => Math.random() - 0.5).slice(0, 2),
    last_synchronized: '2025-03-10',
    metadata: {
      description: `DDBJ DNA Data Bank entries for: "${query}"`,
      confidence: 0.87
    }
  };
}

// ============================================================================
// Simulated AI Accumulator Function
// ============================================================================

function runAIAccumulator(query, databaseResults) {
  // Simulate AI processing to create a unified synthesis
  const totalRecords = 
    (databaseResults.ncbi?.records_found || 0) +
    (databaseResults.pirpdb?.protein_structures || 0) +
    (databaseResults.popset?.population_sets || 0) +
    (databaseResults.genbank?.sequences || 0) +
    (databaseResults.ddbj?.entries || 0);

  const avgConfidence = 
    ((databaseResults.ncbi?.metadata?.confidence || 0) +
     (databaseResults.pirpdb?.metadata?.confidence || 0) +
     (databaseResults.popset?.metadata?.confidence || 0) +
     (databaseResults.bmbl?.metadata?.confidence || 0) +
     (databaseResults.genbank?.metadata?.confidence || 0) +
     (databaseResults.ddbj?.metadata?.confidence || 0)) / 6;

  const bmblSafetyLevel = databaseResults.bmbl?.containment_level || 1;
  const bmblRating = ['Safe (BSL-1)', 'Moderate Caution (BSL-2)', 'High Containment (BSL-3)'][bmblSafetyLevel - 1];

  const abstractText = `
This comprehensive search across six major biological databases identified ${totalRecords.toLocaleString()} entries related to "${query}". 
The NCBI database returned the largest dataset with sequence information spanning multiple organisms including human, mouse, and plant genomes. 
Structural data from PIR-PDB revealed ${databaseResults.pirpdb?.protein_structures || 0} protein structures at high resolution, 
predominantly obtained through X-ray crystallography. Population genetics analysis via POPSET identified significant genetic diversity with 
heterozygosity indices suggesting healthy allelic variation across sampled populations. The GENBANK repository confirmed ${databaseResults.genbank?.sequences || 0} 
annotated sequences with comprehensive taxonomic coverage. DDBJ contribution added ${databaseResults.ddbj?.entries || 0} international submissions 
to the global sequence knowledge base. Safety assessment via BMBL indicates ${bmblRating} classification, with ${databaseResults.bmbl?.hazard_classification?.length || 1} 
distinct hazard classifications observed. Cross-database validation achieved ${(avgConfidence * 100).toFixed(1)}% confidence in the synthesized findings.
  `.trim();

  const crossReferences = [
    {
      source: 'NCBI → PIR-PDB',
      link_count: Math.floor(Math.random() * 500) + 50,
      description: 'Sequence-to-structure mappings'
    },
    {
      source: 'GENBANK → POPSET',
      link_count: Math.floor(Math.random() * 300) + 30,
      description: 'Allelic variation tracking'
    },
    {
      source: 'DDBJ → NCBI',
      link_count: Math.floor(Math.random() * 800) + 100,
      description: 'International sequence synchronization'
    },
    {
      source: 'PIR-PDB → BMBL',
      link_count: Math.floor(Math.random() * 200) + 20,
      description: 'Structural safety implications'
    },
    {
      source: 'POPSET → BMBL',
      link_count: Math.floor(Math.random() * 150) + 15,
      description: 'Population-level risk assessment'
    }
  ];

  return {
    abstract: abstractText,
    cross_references: crossReferences,
    bmbl_safety_rating: bmblRating,
    overall_confidence: (avgConfidence * 100).toFixed(1) + '%',
    total_records_aggregated: totalRecords.toLocaleString(),
    synthesis_timestamp: new Date().toISOString(),
    databases_queried: 6,
    query_analyzed: query
  };
}

// ============================================================================
// HTTP Server & Request Handling
// ============================================================================

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Health check endpoint
  if (pathname === '/health' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    return;
  }

  // Main API endpoint
  if (pathname === '/api/accumulate' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const query = payload.query || 'unknown organism';

        // Simulate database queries
        const databaseResults = {
          ncbi: generateMockNCBI(query),
          pirpdb: generateMockPIRPDB(query),
          popset: generateMockPOPSET(query),
          bmbl: generateMockBMBL(query),
          genbank: generateMockGENBANK(query),
          ddbj: generateMockDDBJ(query)
        };

        // Run AI accumulator
        const aiSynthesis = runAIAccumulator(query, databaseResults);

        // Compile final response
        const response = {
          success: true,
          query: query,
          databases: databaseResults,
          ai_synthesis: aiSynthesis,
          timestamp: new Date().toISOString()
        };

        res.writeHead(200);
        res.end(JSON.stringify(response, null, 2));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ 
          success: false, 
          error: 'Invalid request payload',
          details: error.message 
        }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`🧬 Bio-Database Aggregator running on http://localhost:${PORT}`);
  console.log(`   POST /api/accumulate to query all 6 databases`);
  console.log(`   GET /health to check server status`);
});
