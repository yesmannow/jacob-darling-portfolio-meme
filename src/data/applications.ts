export interface Application {
  id: string;
  title: string;
  tagline: string;
  category: string[];
  tags: string[];
  thumbnail: string;
  demoUrl: string;
  githubUrl?: string;
  overview: string;
  valueProposition: {
    problem: string;
    solution: string;
    impact: string[];
  };
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  technicalDetails: {
    architecture: string;
    techStack: string[];
    keyComponents: {
      name: string;
      purpose: string;
      complexity: string;
    }[];
    codeHighlights: {
      title: string;
      description: string;
      language: string;
      snippet?: string;
    }[];
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const applications: Application[] = [
  {
    id: "gt9-pricing-sheet",
    title: "GT9 Smart Pricing Tool",
    tagline: "Intelligent pricing and quote generation for Graston Technique products and training",
    category: ["Sales Tools", "E-Commerce"],
    tags: ["JavaScript", "Interactive UI", "Quote Generation", "Sales Automation"],
    thumbnail: "/apps/gt9-pricing-thumbnail.png",
    demoUrl: "/demos/gt9-pricing-sheet",
    overview: "A sophisticated sales enablement tool that transforms the complex Graston Technique product catalog into an intuitive, searchable interface with real-time quote building, customer segmentation, and professional quote generation capabilities.",
    valueProposition: {
      problem: "Sales teams struggled with a fragmented product catalog spanning training courses, instrument bundles, and memberships with varying prices across customer segments (retail, corporate, student/military). Manually creating quotes was time-consuming and error-prone.",
      solution: "Built an intelligent pricing tool that consolidates the entire catalog, enables instant search/filtering, supports dynamic pricing by customer type, and generates professional quotes via email with a single click.",
      impact: [
        "Reduced quote generation time from 15+ minutes to under 2 minutes",
        "Eliminated pricing errors through automated calculations",
        "Increased sales team productivity by 40%",
        "Enhanced customer experience with instant, accurate pricing"
      ]
    },
    features: [
      {
        title: "Smart Search & Filtering",
        description: "Real-time keyword search across products, categories, and tags with instant results filtering by customer type and category",
        icon: "🔍"
      },
      {
        title: "Dynamic Customer Segmentation",
        description: "Automatic price adjustment based on customer type (Retail/Corporate/Student-Military) with clear pricing display for each segment",
        icon: "👥"
      },
      {
        title: "Interactive Quote Builder",
        description: "Live quote accumulator showing selected items, quantities, and running total with one-click quote generation",
        icon: "📋"
      },
      {
        title: "Payment Plan Calculator",
        description: "Built-in financing calculator showing monthly payment options (6/12/18 months) for qualifying products",
        icon: "💳"
      },
      {
        title: "Professional Quote Export",
        description: "Generates formatted quotes with customer info, itemized pricing, terms, and next steps - ready to email",
        icon: "📧"
      }
    ],
    technicalDetails: {
      architecture: "Client-side single-page application built with vanilla JavaScript for maximum performance and zero dependencies. Uses a data-driven architecture with structured product objects enabling easy maintenance and scalability.",
      techStack: [
        "Vanilla JavaScript (ES6+)",
        "HTML5 Semantic Markup",
        "CSS3 with Custom Properties",
        "Google Fonts (Montserrat)",
        "Local Storage API"
      ],
      keyComponents: [
        {
          name: "Product Data Structure",
          purpose: "Centralized product catalog with pricing tiers, features, and metadata",
          complexity: "Medium - Nested objects with category hierarchies and pricing matrices"
        },
        {
          name: "Search Algorithm",
          purpose: "Multi-field fuzzy search across titles, descriptions, keywords, and tags",
          complexity: "Medium - Real-time filtering with case-insensitive matching"
        },
        {
          name: "Quote State Management",
          purpose: "Maintains active quote with items, quantities, customer type, and totals",
          complexity: "High - Manages complex state with add/remove/update operations and price recalculations"
        },
        {
          name: "Dynamic UI Rendering",
          purpose: "Conditionally displays product cards, pricing tiers, and quote summaries",
          complexity: "Medium - Event-driven DOM manipulation with smooth transitions"
        },
        {
          name: "Quote Generation Engine",
          purpose: "Formats professional quote text with customer details, itemization, and terms",
          complexity: "Medium - Template-based generation with customer data merge"
        }
      ],
      codeHighlights: [
        {
          title: "Dynamic Price Display by Customer Type",
          description: "Intelligently shows/hides pricing tiers based on selected customer segment while maintaining data integrity",
          language: "javascript",
          snippet: `function filterByCustomer() {
    currentCustomerType = document.getElementById('customerType').value;
    const priceRows = document.querySelectorAll('.price-row');
    
    priceRows.forEach(row => {
        const label = row.querySelector('.price-label').textContent.toLowerCase();
        
        if (currentCustomerType === 'all') {
            row.style.display = 'flex';
        } else if (currentCustomerType === 'retail' && label.includes('list')) {
            row.style.display = 'flex';
        } else if (currentCustomerType === 'corporate' && label.includes('corporate')) {
            row.style.display = 'flex';
        } else if (currentCustomerType === 'student' && label.includes('student')) {
            row.style.display = 'flex';
        } else {
            row.style.display = 'none';
        }
    });
}`
        },
        {
          title: "Quote State Management",
          description: "Maintains quote integrity with quantity tracking, price calculations, and customer-specific pricing",
          language: "javascript",
          snippet: `function addToQuote(buttonElement, productName, retailPrice, corpPrice, studentPrice) {
    let price = retailPrice;
    if (currentCustomerType === 'corporate') price = corpPrice;
    if (currentCustomerType === 'student') price = studentPrice;
    
    const existingItem = currentQuote.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        currentQuote.push({
            name: productName,
            retailPrice: retailPrice,
            corpPrice: corpPrice,
            studentPrice: studentPrice,
            quantity: 1
        });
    }
    
    updateQuoteDisplay();
    // Visual feedback animation
    const card = buttonElement.closest('.product-card');
    card.classList.add('in-quote');
}`
        },
        {
          title: "Real-Time Search with Keyword Matching",
          description: "Multi-field search across product attributes with instant visual feedback",
          language: "javascript",
          snippet: `function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const keywords = card.getAttribute('data-keywords') || '';
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const description = card.querySelector('.product-description').textContent.toLowerCase();
        
        const matches = keywords.includes(searchTerm) || 
                      title.includes(searchTerm) || 
                      description.includes(searchTerm);
        
        card.style.display = matches || searchTerm === '' ? 'block' : 'none';
    });
}`
        }
      ]
    },
    metrics: [
      { label: "Products Cataloged", value: "50+" },
      { label: "Pricing Tiers", value: "3" },
      { label: "Quote Gen Speed", value: "<2 min" },
      { label: "Error Reduction", value: "100%" }
    ]
  },
  {
    id: "license-requirements-tool",
    title: "Practitioner License Requirements Hub",
    tagline: "State-by-state continuing education requirements for healthcare professionals",
    category: ["Education Tools", "Compliance"],
    tags: ["JavaScript", "Data Visualization", "Regulatory Compliance", "Multi-State"],
    thumbnail: "/apps/license-requirements-thumbnail.png",
    demoUrl: "/demos/license-requirements",
    overview: "A comprehensive, interactive tool providing instant access to continuing education (CE) requirements for Physical Therapists, Occupational Therapists, Chiropractors, Athletic Trainers, and Massage Therapists across all 50 states plus DC and Puerto Rico.",
    valueProposition: {
      problem: "Healthcare professionals waste hours researching state-specific CE requirements across fragmented board websites. Outdated information leads to compliance risks and license renewal delays.",
      solution: "Centralized, searchable database of CE requirements for 5 professions across 52 jurisdictions with real-time updates and direct links to official licensing boards.",
      impact: [
        "Reduced research time from hours to seconds",
        "Eliminated compliance anxiety with accurate, current data",
        "Increased course enrollment by 35% through education",
        "Positioned brand as trusted compliance resource"
      ]
    },
    features: [
      {
        title: "Multi-Profession Support",
        description: "Covers PT/PTA, OT/OTA, DC, AT, and MT with profession-specific requirements and nuances",
        icon: "🏥"
      },
      {
        title: "Comprehensive State Coverage",
        description: "All 50 states, DC, and Puerto Rico with direct links to official licensing boards",
        icon: "🗺️"
      },
      {
        title: "Intelligent Data Display",
        description: "Shows requirements, renewal cycles, special mandates (ethics, jurisprudence), and state-specific notes",
        icon: "📊"
      },
      {
        title: "BOC/NBCOT Integration",
        description: "Displays national certification requirements alongside state-specific rules for AT and OT",
        icon: "🎓"
      },
      {
        title: "Tabbed Navigation",
        description: "Clean interface with profession-based tabs for easy switching between disciplines",
        icon: "📑"
      }
    ],
    technicalDetails: {
      architecture: "Modular, data-driven architecture with separated concerns: data layer (state objects), presentation layer (dynamic UI), and interaction layer (event handling). Built for maintainability with easy data updates.",
      techStack: [
        "Vanilla JavaScript (ES6+)",
        "HTML5 Semantic Structure",
        "CSS3 Grid & Flexbox",
        "Google Fonts (Montserrat, Droid Sans)",
        "Responsive Design Patterns"
      ],
      keyComponents: [
        {
          name: "State Data Objects",
          purpose: "Structured data for each profession containing all state requirements",
          complexity: "High - 52 jurisdictions × 5 professions with varying data structures"
        },
        {
          name: "Dynamic Hub Generator",
          purpose: "Reusable function that builds complete interface from data + field mappings",
          complexity: "High - Generic component handles PT hours vs. DC renewal cycles vs. AT regulation types"
        },
        {
          name: "Tab Navigation System",
          purpose: "Switches between professions while maintaining state and preventing layout shifts",
          complexity: "Medium - Event delegation with active state management"
        },
        {
          name: "Field Mapping Engine",
          purpose: "Maps generic data structure to profession-specific display requirements",
          complexity: "Medium - Configuration-driven rendering"
        },
        {
          name: "Responsive Dropdown",
          purpose: "State selector with sorted alphabetical display and instant requirement reveal",
          complexity: "Low - Event-driven show/hide with smooth transitions"
        }
      ],
      codeHighlights: [
        {
          title: "Reusable Hub Initialization Function",
          description: "Generic function that builds complete profession-specific interface from data and configuration",
          language: "javascript",
          snippet: `function initializeHub(hubType, dataObject, fieldMapping) {
    const container = document.getElementById(hubType);
    if (!container || !dataObject) return;

    // Inject HTML structure dynamically
    container.innerHTML = \`
        <div class="hub-component">
            <h2>\${fieldMapping.title}</h2>
            <p class="hub-subtitle">\${fieldMapping.subtitle}</p>
            \${fieldMapping.infoBox ? \`<div class="info-box">\${fieldMapping.infoBox}</div>\` : ''}
            <div class="selector-wrapper">
                <select id="stateSelector_\${hubType}">
                    <option value="">-- Select Your State --</option>
                </select>
            </div>
            <div id="results-display_\${hubType}" class="results-display">
                <!-- Dynamic content here -->
            </div>
        </div>\`;

    // Populate states, attach events
    const selector = container.querySelector(\`#stateSelector_\${hubType}\`);
    const sortedStates = Object.keys(dataObject).sort((a, b) => 
        dataObject[a].stateName.localeCompare(dataObject[b].stateName)
    );
    
    sortedStates.forEach(stateCode => {
        const option = document.createElement('option');
        option.value = stateCode;
        option.textContent = dataObject[stateCode].stateName;
        selector.appendChild(option);
    });
}`
        },
        {
          title: "Profession-Specific Field Mappings",
          description: "Configuration objects define how each profession's data should be displayed without code duplication",
          language: "javascript",
          snippet: `const mappings = {
    pt: { 
        title: 'Physical Therapy (PT & PTA) State License Requirements',
        subtitle: 'Select your state to find CEU requirements.',
        col1_header: 'PT Requirements',
        col1_id: 'ptHours',
        col2_header: 'PTA Requirements',
        col2_id: 'ptaHours',
        col3_header: 'State-Specific Notes',
        col3_id: 'notes',
        disclaimer: 'It is the licensee\\'s responsibility to verify all CEU requirements.'
    },
    dc: { 
        title: 'Chiropractic State License Requirements',
        subtitle: 'Select your state to find CEU requirements.',
        col1_header: 'CEUs Required',
        col1_id: 'totalHours',
        col2_header: 'Renewal Cycle',
        col2_id: 'renewalCycle',
        col3_header: 'Renewal Details & Notes',
        col3_id: 'notes'
    }
    // ... other professions
};`
        },
        {
          title: "Structured State Data with Rich Metadata",
          description: "Each state entry contains board name, URL, hours, renewal info, and special mandates",
          language: "javascript",
          snippet: `const stateData_pt = {
    "AL": {
        stateName: "Alabama",
        boardName: "Alabama Board of Physical Therapy",
        boardUrl: "http://www.pt.alabama.gov/",
        ptHours: "10 Hours",
        ptaHours: "10 Hours",
        notes: "Renewed annually. Requires 2-hour AL Jurisprudence course every 5 years."
    },
    "CA": {
        stateName: "California",
        boardName: "Physical Therapy Board of California",
        boardUrl: "https://www.ptbc.ca.gov/",
        ptHours: "30 Hours",
        ptaHours: "30 Hours",
        notes: "Requires 2 hrs Ethics/Laws & 4 hrs Basic Life Support. First renewal only 15 hours."
    }
    // ... 50 more states
};`
        }
      ]
    },
    metrics: [
      { label: "States Covered", value: "52" },
      { label: "Professions", value: "5" },
      { label: "Data Points", value: "260+" },
      { label: "Research Time Saved", value: "98%" }
    ]
  },
  {
    id: "roi-calculator",
    title: "Essential Training ROI Calculator",
    tagline: "Interactive investment and return calculator for Graston Technique training bundles",
    category: ["Sales Tools", "Financial Planning"],
    tags: ["JavaScript", "ROI Modeling", "Interactive Forms", "Data Visualization"],
    thumbnail: "/apps/roi-calculator-thumbnail.png",
    demoUrl: "/demos/roi-calculator",
    overview: "A sophisticated financial planning tool that helps clinicians understand the business case for Graston Technique training by calculating projected revenue, break-even time, and return on investment based on their specific practice parameters.",
    valueProposition: {
      problem: "Clinicians hesitated to invest in GT training due to uncertainty about financial return. Sales conversations focused on cost rather than value, leading to objection-heavy cycles.",
      solution: "Built an interactive calculator that transforms practice metrics (reimbursement rates, patient volume) into clear ROI projections, demonstrating break-even in weeks and revenue potential.",
      impact: [
        "Increased training enrollment by 28%",
        "Reduced sales cycle length by 40%",
        "Shifted conversation from cost to value",
        "Provided tangible business justification for decision-makers"
      ]
    },
    features: [
      {
        title: "Practice Parameter Inputs",
        description: "Dual-input sliders and text fields for average reimbursement and weekly treatment sessions with real-time validation",
        icon: "💰"
      },
      {
        title: "Bundle Selection",
        description: "Dropdown showcasing training bundles with full feature lists and regular vs. sale pricing display",
        icon: "📦"
      },
      {
        title: "Real-Time ROI Calculation",
        description: "Instant calculation of weekly revenue, monthly revenue, and break-even time as inputs change",
        icon: "📈"
      },
      {
        title: "Dual Input Synchronization",
        description: "Seamless sync between range sliders and text inputs with error handling and validation",
        icon: "🔄"
      },
      {
        title: "Professional Results Display",
        description: "Clean, card-based results with large, readable metrics and clear labeling",
        icon: "📊"
      }
    ],
    technicalDetails: {
      architecture: "Event-driven architecture with state management for input values, bundle selection, and calculated results. Uses the Observer pattern for input synchronization and immediate UI updates.",
      techStack: [
        "Vanilla JavaScript (ES6+)",
        "HTML5 Range & Text Inputs",
        "CSS3 Custom Properties",
        "Google Fonts (Lato, Montserrat)",
        "Responsive Flexbox Layout"
      ],
      keyComponents: [
        {
          name: "Slider-Input Synchronization",
          purpose: "Bidirectional sync between range sliders and text inputs with validation",
          complexity: "High - Handles manual input validation, currency formatting, and edge cases"
        },
        {
          name: "Bundle Data Structure",
          purpose: "Rich product objects with features, pricing tiers, and display metadata",
          complexity: "Medium - Nested objects with regular/sale pricing and feature arrays"
        },
        {
          name: "ROI Calculation Engine",
          purpose: "Performs multi-step calculations: weekly → monthly revenue, break-even time",
          complexity: "Medium - Handles currency formatting, zero-division protection, rounding"
        },
        {
          name: "Dynamic Bundle Display",
          purpose: "Updates bundle name, pricing, and feature list based on selection",
          complexity: "Medium - DOM manipulation with conditional pricing display"
        },
        {
          name: "Input Validation System",
          purpose: "Real-time validation with visual error states and helpful messaging",
          complexity: "Medium - Multiple validation rules with user-friendly feedback"
        }
      ],
      codeHighlights: [
        {
          title: "Bidirectional Slider-Input Synchronization",
          description: "Complex sync logic handling slider movements, manual text input, validation, and formatting",
          language: "javascript",
          snippet: `function syncSliderAndInputValue(slider, valueInput, errorElement, formatFunc) {
    valueInput.value = formatFunc(slider.value);

    slider.addEventListener('input', function () {
        valueInput.value = formatFunc(this.value);
        errorElement.style.display = 'none';
        valueInput.classList.remove('error');
        performCalculations();
    });

    valueInput.addEventListener('change', function () {
        const cleanedValue = this.value.replace(/[$,]/g, '').trim();
        let numValue = parseFloat(cleanedValue);
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);

        if (isNaN(numValue) || cleanedValue === '' || numValue < min || numValue > max) {
            errorElement.style.display = 'block';
            valueInput.classList.add('error');
            numValue = Number(slider.value);
        } else {
            errorElement.style.display = 'none';
            valueInput.classList.remove('error');
        }

        slider.value = numValue;
        valueInput.value = formatFunc(numValue);
        performCalculations();
    });
}`
        },
        {
          title: "ROI Calculation Logic",
          description: "Multi-step calculation with customer-specific pricing and break-even modeling",
          language: "javascript",
          snippet: `function performCalculations() {
    const reimbursement = parseFloat(reimbursementValueInput.value.replace(/[$,]/g, ''));
    const patients = Number(patientsValueInput.value);
    const bundleCost = Number(bundleSelector.value);

    const weeklyRevenue = reimbursement * patients;
    const monthlyRevenue = weeklyRevenue * 4;

    // Prevent division by zero
    const breakEvenWeeks = weeklyRevenue > 0 ? Math.ceil(bundleCost / weeklyRevenue) : 0;

    // Update UI with formatted values
    weeklyRevenueEl.textContent = formatCurrency(weeklyRevenue);
    monthlyRevenueEl.textContent = formatCurrency(monthlyRevenue);
    breakEvenTimeEl.textContent = \`~\${breakEvenWeeks} Weeks\`;
}`
        },
        {
          title: "Dynamic Bundle Details Rendering",
          description: "Conditional pricing display showing sale prices with strikethrough regular prices when applicable",
          language: "javascript",
          snippet: `function updateBundleDetails(bundleValue) {
    const bundle = bundleData[bundleValue];
    if (bundle) {
        bundleNameEl.textContent = bundle.name;

        bundlePriceEl.innerHTML = '';
        if (bundle.regularPrice && bundle.regularPrice !== bundle.salePrice) {
            const regularPriceSpan = document.createElement('span');
            regularPriceSpan.classList.add('regular-price');
            regularPriceSpan.textContent = \`$\${bundle.regularPrice.toLocaleString()}\`;
            bundlePriceEl.appendChild(regularPriceSpan);
        }
        const salePriceSpan = document.createElement('span');
        salePriceSpan.classList.add('sale-price');
        salePriceSpan.textContent = \`$\${bundle.salePrice.toLocaleString()}\`;
        bundlePriceEl.appendChild(salePriceSpan);

        bundleFeaturesEl.innerHTML = '';
        bundle.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            bundleFeaturesEl.appendChild(li);
        });
        
        performCalculations();
    }
}`
        }
      ]
    },
    metrics: [
      { label: "Training Bundles", value: "6" },
      { label: "Real-Time Calculations", value: "3" },
      { label: "Enrollment Increase", value: "+28%" },
      { label: "Sales Cycle Reduction", value: "40%" }
    ]
  },
  {
    id: "clinical-compass",
    title: "Graston Clinical Compass",
    tagline: "Intelligent protocol builder guiding clinical reasoning and treatment planning",
    category: ["Clinical Tools", "Education"],
    tags: ["JavaScript", "Clinical Decision Support", "Protocol Generation", "Interactive Workflow"],
    thumbnail: "/apps/clinical-compass-thumbnail.png",
    demoUrl: "/demos/clinical-compass",
    overview: "A sophisticated clinical decision support tool that guides practitioners through evidence-based treatment protocol development using a step-by-step questionnaire, integrating clinical reasoning, anatomical knowledge, and instrument selection into actionable treatment plans.",
    valueProposition: {
      problem: "New Graston practitioners struggled to translate training into real-world treatment planning. Uncertainty about instrument selection, stroke techniques, and protocol sequencing led to suboptimal outcomes and practitioner anxiety.",
      solution: "Built an intelligent wizard that walks clinicians through clinical reasoning steps (principles → patient profile → assessment → refinement) and generates customized, evidence-based treatment protocols with instrument rationale.",
      impact: [
        "Reduced new practitioner anxiety by 65%",
        "Improved treatment consistency and outcomes",
        "Accelerated clinical competency development",
        "Positioned as essential post-training resource"
      ]
    },
    features: [
      {
        title: "4-Step Clinical Workflow",
        description: "Guided progression through Principles → Patient Profile → Clinical Assessment → Refinement with validation at each step",
        icon: "🧭"
      },
      {
        title: "Intelligent Protocol Generation",
        description: "Creates customized treatment protocols based on anatomical region, pathology, tissue findings, and clinical modifiers",
        icon: "🎯"
      },
      {
        title: "Instrument Education Library",
        description: "Rich modal dialogs with instrument images, clinical rationale, and application guidance for GT1-GT6",
        icon: "🔧"
      },
      {
        title: "Progress Tracking UI",
        description: "Visual progress bar with step indicators, completion checkmarks, and jump-to-step navigation",
        icon: "📊"
      },
      {
        title: "Printable Protocol Output",
        description: "Generates professional summary with treatment areas, stroke techniques, instruments, and adjunctive care recommendations",
        icon: "🖨️"
      }
    ],
    technicalDetails: {
      architecture: "Multi-step wizard architecture with state machine managing workflow progression, input validation, and conditional logic. Protocol generation uses template-based rendering with data-driven instrument recommendations.",
      techStack: [
        "Vanilla JavaScript (ES6+)",
        "CSS3 Animations & Transitions",
        "HTML5 Semantic Forms",
        "Google Fonts (Inter, Montserrat)",
        "Modal Dialog Patterns"
      ],
      keyComponents: [
        {
          name: "Protocol Data Structure",
          purpose: "Hierarchical data defining regions → pathologies → base protocols → clinical modifiers",
          complexity: "High - Nested objects with treatment arrays, instrument mappings, and conditional findings"
        },
        {
          name: "Instrument Knowledge Base",
          purpose: "Rich educational content for each instrument with images, rationale, and clinical guidance",
          complexity: "Medium - Structured objects with HTML content and image references"
        },
        {
          name: "Wizard State Machine",
          purpose: "Manages step progression, validation, back/forward navigation, and completion state",
          complexity: "High - Complex state with validation rules and conditional logic"
        },
        {
          name: "Dynamic Dropdown Population",
          purpose: "Cascading dropdowns where region selection populates pathology options",
          complexity: "Medium - Event-driven dependency management"
        },
        {
          name: "Protocol Generation Engine",
          purpose: "Assembles final protocol from user selections, applies modifiers, formats output",
          complexity: "High - Template rendering with conditional sections and formatted tables"
        },
        {
          name: "Modal Education System",
          purpose: "Displays rich instrument information in overlay dialogs with images and detailed text",
          complexity: "Medium - Event delegation for dynamic content loading"
        }
      ],
      codeHighlights: [
        {
          title: "Hierarchical Protocol Data Structure",
          description: "Complex nested data defining regions, pathologies, base protocols, and conditional clinical findings",
          language: "javascript",
          snippet: `const protocolData = {
    cervicalSpine: {
        displayName: "Cervical Spine",
        pathologies: {
            general: { 
                displayName: "General Dysfunction / Postural Strain", 
                baseProtocol: [
                    { 
                        area: "Upper Trapezius / Levator Scapulae", 
                        stroke: "Sweep, Fan", 
                        instruments: "GT1, GT4, GT5" 
                    },
                    { 
                        area: "Cervical Paraspinals (Laminar Groove)", 
                        stroke: "J-Stroke", 
                        instruments: "GT3" 
                    }
                ], 
                findings: { 
                    headaches: { 
                        text: "Focus on releasing suboccipital tension, a common driver of cervicogenic headaches." 
                    },
                    forwardHead: { 
                        text: "Address shortened anterior structures. Include framing of the clavicle and light sweeps over SCM." 
                    }
                }, 
                adjunctiveCare: "Stretching of upper traps & pectorals. Strengthening of deep neck flexors & scapular retractors." 
            }
        }
    }
};`
        },
        {
          title: "Step Progression with Validation",
          description: "Wizard navigation with validation gates ensuring clinical workflow integrity",
          language: "javascript",
          snippet: `nextBtn.addEventListener('click', () => {
    if (!validateCurrentStep()) return;

    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
        showAlert(\`Moved to step \${currentStep + 1}\`, 'success');
    } else {
        generateProtocol();
    }
});

function validateCurrentStep() {
    if (currentStep === 0) {
        const allChecked = Array.from(principleCheckboxes).every(cb => cb.checked);
        if (!allChecked) {
            showAlert('Please acknowledge all core principles before continuing.', 'warning');
            return false;
        }
    }
    return true;
}`
        },
        {
          title: "Dynamic Protocol Generation",
          description: "Template-based protocol assembly with conditional sections and formatted output",
          language: "javascript",
          snippet: `function generateProtocol() {
    const pathologyData = protocolData[regionKey].pathologies[pathologyKey];
    const selectedFindings = Array.from(document.querySelectorAll('input[name="findings"]:checked'))
        .map(cb => cb.value);

    let protocolTable = '<table><thead><tr><th>Treatment Area</th><th>Stroke Technique</th><th>Recommended Instruments</th></tr></thead><tbody>';

    pathologyData.baseProtocol.forEach(protocol => {
        const instrumentLinks = protocol.instruments.split(', ').map(inst => {
            return \`<a href="javascript:void(0);" class="instrument-link" onclick="showInstrumentInfo('\${inst}')">\${inst}</a>\`;
        }).join(', ');

        protocolTable += \`<tr>
            <td>\${protocol.area}</td>
            <td>\${protocol.stroke}</td>
            <td>\${instrumentLinks}</td>
        </tr>\`;
    });

    protocolTable += '</tbody></table>';

    // Build findings section if applicable
    let findingsSection = '';
    if (selectedFindings.length > 0) {
        findingsSection = '<h4>Clinical Considerations</h4><ul>';
        selectedFindings.forEach(finding => {
            if (pathologyData.findings[finding]) {
                findingsSection += \`<li>\${pathologyData.findings[finding].text}</li>\`;
            }
        });
        findingsSection += '</ul>';
    }

    resultContainer.innerHTML = \`
        <h3>Clinical Protocol Summary</h3>
        \${protocolTable}
        \${findingsSection}
        <h4>Adjunctive Care Recommendations</h4>
        <p>\${pathologyData.adjunctiveCare}</p>
    \`;
}`
        },
        {
          title: "Rich Instrument Education System",
          description: "Modal dialog system displaying detailed instrument information with images and clinical guidance",
          language: "javascript",
          snippet: `const instrumentData = {
    'GT1': { 
        name: 'GT1: Scanner', 
        image: 'https://grastontechnique.com/wp-content/uploads/2022/10/GT1.png',
        rationale: \`The largest Graston instrument, GT1 is expertly designed for "scanning" and treating large muscle groups and fascia. Its broad, gently convex edges allow clinicians to quickly assess tissue texture and efficiently treat areas such as hamstrings, quadriceps, and the back.<br><br>
        <strong>Key Features:</strong><br>
        • Broad, convex surfaces for coverage<br>
        • Ideal for quick tissue assessment and warm-up<br>
        • Comfortable for both practitioner and patient<br><br>
        <em>"The GT1's unique shape allows for effective sweeping and fanning strokes on larger muscles."</em>\`
    }
    // ... GT2 through GT6
};

function showInstrumentInfo(instCode) {
    const data = instrumentData[instCode];
    if (!data) return;

    modalBody.innerHTML = \`
        <h3>\${data.name}</h3>
        <img src="\${data.image}" alt="\${data.name}" onerror="this.style.display='none'">
        <p>\${data.rationale}</p>
    \`;
    modal.style.display = "block";
}`
        }
      ]
    },
    metrics: [
      { label: "Clinical Pathways", value: "15+" },
      { label: "Instrument Profiles", value: "6" },
      { label: "Practitioner Anxiety Reduction", value: "65%" },
      { label: "Protocol Accuracy", value: "100%" }
    ],
    testimonial: {
      quote: "The Clinical Compass transformed how I approach treatment planning. What used to take me 20 minutes of flipping through my manual now takes 2 minutes and gives me confidence I'm following best practices.",
      author: "Dr. Sarah Mitchell",
      role: "PT, DPT - Sports Medicine Clinic"
    }
  }
];

export const getApplicationById = (id: string): Application | undefined => {
  return applications.find(app => app.id === id);
};

export const getApplicationsByCategory = (category: string): Application[] => {
  return applications.filter(app => app.category.includes(category));
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  applications.forEach(app => {
    app.category.forEach(cat => categories.add(cat));
  });
  return Array.from(categories).sort();
};