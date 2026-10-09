export const qualitySteps = [
  { title: 'ORIGINAL DESIGN', image: '198cc', text: 'Translating design intent into a refined product architecture.' },
  { title: 'SIZE & CONFIGURATION', image: '0b9ee', text: 'Defining precise dimensions, proportions, and structural parameters.' },
  { title: 'VEHICLE FITMENT', image: '6417a', text: 'Engineering seamless integration with the vehicle platform.' },
  { title: 'DETAIL & PROPORTION', image: '0b9ee', text: 'Refining every surface, transition, and functional detail.' },
  { title: 'FINISH SELECTION', image: 'f7558', text: 'Curating finishes that balance material character and visual precision.' },
  { title: 'DEV PEV', image: '0b9ee', text: 'Developing, validating, and optimizing performance through rigorous engineering evaluation.' },
  { title: 'ACTUAL VEHICLE VERIFICATION', image: 'f7558', text: 'Validating fitment, performance, and visual integrity on the actual vehicle.' },
  { title: 'FINAL PRODUCT', image: '0b9ee', text: 'Bringing validated engineering and refined design into final production.' },
]
// The artboard supplies the first tab. Remaining descriptions are concise
// editorial summaries of the supplied engineering workflow, pending final copy.
export const materialTopics = [
  { title: 'High-Performance Materials', image: '4296b', text: 'VIVE uses T6-6061 aluminum alloy as its primary material, while continuously exploring the use of advanced materials such as high-performance aluminum alloys, magnesium alloys, and carbon fiber. By continuously optimizing material properties and manufacturing processes, VIVE achieves higher structural strength, lower weight, and improved durability in its products.' },
  { title: 'Forging Technology', image: '3e5fc', text: 'Material selection and process control are part of the development of every forged wheel. Forging, precision machining and engineering verification work together to bring the design into production.' },
  { title: 'Heat Treatment Technology', image: '0b9ee', text: 'Material properties and manufacturing processes are developed together. Heat treatment is part of this process, with requirements confirmed for the selected material and product specification.' },
  { title: 'Precision CNC Machining', image: '198cc', text: 'From forging to CNC precision machining, every surface, transition and functional detail is refined around the wheel’s dimensions and structural parameters.' },
  { title: 'Engineering Development', image: '6417a', text: 'From original design to vehicle fitment, engineering development brings together structural optimization, digital validation and verification on the actual vehicle.' },
  { title: 'Inspection & Quality Management', image: '3e5fc', text: 'VIVE’s quality management system covers development, manufacturing, quality control and continuous improvement. Quality traceability supports monitoring of key stages in the manufacturing process.' },
]
export const devStages = ['3D CAD Engineering Design', 'Vehicle Fitment Analysis', 'FEA', 'Load Simulation', 'Structural Optimization', 'Fatigue Life Prediction', 'Brake Clearance Validation', 'Lightweight Optimization']
// Figma 891:2485 — PEV content, kept separate from the DEV workflow.
export const pevStages = ['Prototype Manufacturing', 'Bending Fatigue Testing', 'Radial Fatigue Testing', 'Impact Testing', 'Track Validation', 'Real-World Road Validation', 'Continuous Optimization', 'Engineering Improvement']
export const validationSlides = [
  { label: 'DEV', title: 'Digital Engineering Validation', image: 'c16b5', stages: devStages, links: [
    { label: 'Street Series', href: '/products?series=STREET#wheel-filters' },
    { label: 'Off-Road Series', href: '/products?series=OFF-ROAD#wheel-filters' },
    { label: 'Standard custom-forged wheel hubs', href: 'mailto:info@vivewheels.com' },
  ] },
  { label: 'PEV', title: 'Performance Engineering Validation', image: '198cc', stages: pevStages, links: [
    { label: 'Track Series', href: '/products?series=RACING#wheel-filters' },
    { label: 'Motorsport Products', href: '/products?series=RACING#wheel-filters' },
    { label: 'New Technology R&D Projects', href: 'mailto:info@vivewheels.com?subject=New%20Technology%20R%26D%20Projects' },
    { label: 'New Material Development Project', href: 'mailto:info@vivewheels.com?subject=New%20Material%20Development%20Project' },
  ] },
]
