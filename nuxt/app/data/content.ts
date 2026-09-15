export const products = [
  { image: 'img19388C9Bbd0Eb399Cde99F7Fbfe62B6F1.webp', variant: 'wheel-one', color: 'black' },
  { image: 'imgVsMl2111.webp', variant: 'wheel-two', color: 'red' },
  { image: 'img90Df5414Dbd610Fe185Db9C49904D8B81.webp', variant: 'wheel-three', color: 'gold' },
  { image: 'imgVs661.webp', variant: 'wheel-four', color: 'black' },
] as const

export const wheelColors = {
  black: { image: 'img19388C9Bbd0Eb399Cde99F7Fbfe62B6F1.webp', variant: 'wheel-one', value: '#050505' },
  red: { image: 'imgVsMl2111.webp', variant: 'wheel-two', value: '#ae0909' },
  gold: { image: 'img90Df5414Dbd610Fe185Db9C49904D8B81.webp', variant: 'wheel-three', value: '#8e6b00' },
} as const

export const engineeringSteps = [
  {
    title: 'Precision Manufacturing',
    description: 'Every VIVE product follows unified engineering standards and manufacturing processes. Advanced forging, precision CNC machining, and rigorous production specifications ensure consistency, reliability, and dimensional accuracy. For us, quality is defined not only by the finished product, but by every detail throughout the manufacturing process.',
    image: 'engineering-1.webp',
    alt: 'Precision electronics manufacturing line',
  },
  {
    title: 'Engineering R&D',
    description: 'We continually invest in materials research, engineering technology, and product development. Using validation methods such as finite element analysis (FEA), we optimize weight, structural strength, and durability to deliver precisely engineered solutions for a wide range of vehicles.',
    image: 'engineering-2.webp',
    alt: 'VIVE engineering research and development',
  },
  {
    title: 'Advanced Materials',
    description: 'T6-6061 aluminum alloy is our primary material. We continue to explore new materials and manufacturing processes to enhance product performance and durability.',
    image: 'engineering-3.webp',
    alt: 'VIVE advanced aluminum alloy manufacturing',
  },
  {
    title: 'Custom Development',
    description: 'We provide professional custom development and engineered solutions tailored to different vehicles, applications, and customer requirements.',
    image: 'engineering-4.webp',
    alt: 'VIVE custom wheel development and testing',
  },
  {
    title: 'Precision Surface Treatment',
    description: 'A broad selection of precision surface finishes enhances durability while meeting a wide range of individual styling requirements.',
    image: 'engineering-5.webp',
    alt: 'VIVE precision wheel surface treatment',
  },
  {
    title: 'Quality Commitment',
    description: 'Every wheel we build is engineered with one goal: the warranty should never need to be used. From materials research and engineering design to precision manufacturing, every process is centered on safety, durability, and performance.',
    image: 'engineering-6.webp',
    alt: 'Close-up of VIVE wheel manufacturing quality',
  },
  {
    title: 'User Experience',
    description: 'From expert consultation and product delivery to long-term technical support, we put customer needs first. Our transparent, efficient, and dependable end-to-end service makes every partnership more assured.',
    image: 'engineering-7.webp',
    alt: 'VIVE wheel fitted to a performance vehicle',
  },
] as const

export const stats = [
  ['48+', 'TECHNICIANS'],
  ['27+', 'ENGINEERS'],
  ['27+', 'YEARS OF EXPERTISE'],
  ['2.8M+', 'WHEELS PRODUCED ANNUALLY'],
] as const

export const journals = [
  ['imgDsc8152.webp', 'VIVE Unveils Its New Forged Wheel Collection'],
  ['imgDsc007471.webp', 'Next-Generation Lightweight Wheels Debut with Performance and Style'],
  ['imgDsc007911.webp', 'New Multi-Spoke Design Redefines the Performance Wheel Aesthetic'],
  ['imgCloseUpMetalGear1.webp', 'VIVE Introduces New Custom Wheel Finish Options'],
] as const
