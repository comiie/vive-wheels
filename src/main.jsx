import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import '@fontsource/space-mono/400.css'
import './style.css'

const A = (import.meta.env.VITE_ASSET_BASE || '/assets/').replace(/\/?$/, '/')

document.documentElement.style.setProperty('--engineering-mask', `url("${A}imgLouisReedWStCaQpiLtcUnsplash3.svg")`)
document.documentElement.style.setProperty('--journal-mask', `url("${A}imgDsc008151.svg")`)

const products = [
  { image: 'img19388C9Bbd0Eb399Cde99F7Fbfe62B6F1.png', variant: 'wheel-one', color: 'black' },
  { image: 'imgVsMl2111.png', variant: 'wheel-two', color: 'red' },
  { image: 'img90Df5414Dbd610Fe185Db9C49904D8B81.png', variant: 'wheel-three', color: 'gold' },
  { image: 'imgVs661.png', variant: 'wheel-four', color: 'black' },
]

const wheelColors = {
  black: { image: 'img19388C9Bbd0Eb399Cde99F7Fbfe62B6F1.png', variant: 'wheel-one', value: '#050505' },
  red: { image: 'imgVsMl2111.png', variant: 'wheel-two', value: '#ae0909' },
  gold: { image: 'img90Df5414Dbd610Fe185Db9C49904D8B81.png', variant: 'wheel-three', value: '#8e6b00' },
}

const engineeringSteps = [
  {
    title: 'Precision Manufacturing',
    description: 'Every VIVE product follows unified engineering standards and manufacturing processes. Advanced forging, precision CNC machining, and rigorous production specifications ensure consistency, reliability, and dimensional accuracy. For us, quality is defined not only by the finished product, but by every detail throughout the manufacturing process.',
    image: 'engineering-1.png',
    alt: 'Precision electronics manufacturing line',
  },
  {
    title: 'Engineering R&D',
    description: 'We continually invest in materials research, engineering technology, and product development. Using validation methods such as finite element analysis (FEA), we optimize weight, structural strength, and durability to deliver precisely engineered solutions for a wide range of vehicles.',
    image: 'engineering-2.png',
    alt: 'VIVE engineering research and development',
  },
  {
    title: 'Advanced Materials',
    description: 'T6-6061 aluminum alloy is our primary material. We continue to explore new materials and manufacturing processes to enhance product performance and durability.',
    image: 'engineering-3.png',
    alt: 'VIVE advanced aluminum alloy manufacturing',
  },
  {
    title: 'Custom Development',
    description: 'We provide professional custom development and engineered solutions tailored to different vehicles, applications, and customer requirements.',
    image: 'engineering-4.png',
    alt: 'VIVE custom wheel development and testing',
  },
  {
    title: 'Precision Surface Treatment',
    description: 'A broad selection of precision surface finishes enhances durability while meeting a wide range of individual styling requirements.',
    image: 'engineering-5.png',
    alt: 'VIVE precision wheel surface treatment',
  },
  {
    title: 'Quality Commitment',
    description: 'Every wheel we build is engineered with one goal: the warranty should never need to be used. From materials research and engineering design to precision manufacturing, every process is centered on safety, durability, and performance.',
    image: 'engineering-6.png',
    alt: 'Close-up of VIVE wheel manufacturing quality',
  },
  {
    title: 'User Experience',
    description: 'From expert consultation and product delivery to long-term technical support, we put customer needs first. Our transparent, efficient, and dependable end-to-end service makes every partnership more assured.',
    image: 'engineering-7.png',
    alt: 'VIVE wheel fitted to a performance vehicle',
  },
]

const stats = [
  ['48+', 'TECHNICIANS'],
  ['27+', 'ENGINEERS'],
  ['27+', 'YEARS OF EXPERTISE'],
  ['2.8M+', 'WHEELS PRODUCED ANNUALLY'],
]

const journals = [
  ['imgDsc8152.png', 'VIVE Unveils Its New Forged Wheel Collection'],
  ['imgDsc007471.png', 'Next-Generation Lightweight Wheels Debut with Performance and Style'],
  ['imgDsc007911.png', 'New Multi-Spoke Design Redefines the Performance Wheel Aesthetic'],
  ['imgCloseUpMetalGear1.png', 'VIVE Introduces New Custom Wheel Finish Options'],
]

function ArrowButton({ children }) {
  return (
    <button className="outline-button" type="button">
      <span>{children}</span>
      <img src={`${A}imgFrame2147238903.svg`} alt="" />
    </button>
  )
}

function RevealLine({ children, sequence }) {
  const words = children.split(' ')
  return (
    <span aria-hidden="true">
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <i style={{ '--word-index': sequence[index] }}>{word}</i>
          {index < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  )
}

function RevealWords({ text }) {
  let wordIndex = 0
  return text.split('\n').map((line, lineIndex) => (
    <span className="title-line" aria-hidden="true" key={`${line}-${lineIndex}`}>
      {line.split(' ').map((word, index, words) => {
        const indexValue = wordIndex++
        return (
          <React.Fragment key={`${word}-${index}`}>
            <span className="reveal-word" style={{ '--word-index': indexValue }}>{word}</span>
            {index < words.length - 1 ? ' ' : null}
          </React.Fragment>
        )
      })}
    </span>
  ))
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let previousY = window.scrollY
    let frame = 0
    const updateHeader = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const currentY = window.scrollY
        const delta = currentY - previousY
        setScrolled(currentY > 16)
        if (currentY <= 16) setVisible(true)
        else if (Math.abs(delta) > 5) setVisible(delta < 0)
        previousY = currentY
        frame = 0
      })
    }
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateHeader)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${visible ? '' : ' is-hidden'}`}>
      <a className="brand" href="#top" aria-label="VIVE home">
        <span className="brand-crop"><img src={`${A}imgChatgptImage20265152123561.png`} alt="VIVE" /></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#products">PRODUCTS</a>
        <a href="#about">ABOUT</a>
        <a href="#journal">JOURNAL</a>
        <a href="#footer">FAQS</a>
      </nav>
      <div className="header-actions">
        <button type="button" className="language">EN</button>
        <a className="contact-link" href="mailto:info@vivewheels.com">
          CONTACT US <img src={`${A}imgFrame2147238903.svg`} alt="" />
        </a>
      </div>
      <button className="menu-button" type="button" aria-label="Open menu">MENU</button>
    </header>
  )
}

function Hero({ onOpenVideo }) {
  return (
    <section className="hero screen" id="top">
      <video
        className="hero-bg"
        src={`${A}scout-hero-11-21.mp4`}
        poster={`${A}scout-hero-poster.jpg`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Scout autonomous vehicle driving through woodland"
      />
      <div className="hero-shade" />
      <img className="hero-top-fade" src={`${A}imgRectangle1430107304.png`} alt="" />
      <Header />
      <div className="hero-copy">
        <h1 aria-label="ENGINEERED FOR THE DRIVEN">
          <RevealLine sequence={[0, 2]}>ENGINEERED FOR</RevealLine>
          <RevealLine sequence={[1, 3]}>THE DRIVEN</RevealLine>
        </h1>
        <p>Performance wheels engineered through advanced materials and uncompromising design.</p>
      </div>
      <button className="video-card" type="button" onClick={onOpenVideo} aria-haspopup="dialog" aria-label="Play Discover VIVE video">
        <div className="video-thumb">
          <img src={`${A}imgImage2.png`} alt="VIVE off-road video" />
          <span className="play"><img src={`${A}imgFrame2087326985.svg`} alt="Play" /></span>
        </div>
        <div className="video-meta"><span>NEW VIDEO</span><strong>Discover VIVE</strong></div>
      </button>
    </section>
  )
}

function ProductCard({ item }) {
  const [selectedColor, setSelectedColor] = useState(item.color)
  const selectedWheel = selectedColor === item.color ? item : wheelColors[selectedColor]

  return (
    <article className="product-card">
      <img className="product-shape" src={`${A}imgVector14.svg`} alt="" />
      <div className="product-stage" />
      <div className={`wheel-box ${selectedWheel.variant}`}><img key={selectedColor} src={`${A}${selectedWheel.image}`} alt={`VIVE VV1R ${selectedColor} forged wheel`} /></div>
      <div className="product-copy"><h3>VV1R</h3><p>MONOBLOCK</p></div>
      <div className="swatches" aria-label="Wheel finish options">
        {Object.entries(wheelColors).map(([color, option]) => (
          <button
            className={`color-swatch${selectedColor === color ? ' is-active' : ''}`}
            type="button"
            aria-label={`Select ${color} finish`}
            aria-pressed={selectedColor === color}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setSelectedColor(color)}
            key={color}
          >
            <span style={{ background: option.value }} />
          </button>
        ))}
      </div>
    </article>
  )
}

function Products() {
  const [activeFilter, setActiveFilter] = useState('OFF-ROAD')
  const [progress, setProgress] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [progressDragging, setProgressDragging] = useState(false)
  const viewportRef = useRef(null)
  const momentumRef = useRef(0)
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, lastX: 0, lastTime: 0, velocity: 0 })
  const progressDragRef = useRef(false)
  const progressTargetRef = useRef(0)
  const repeatedProducts = [...products, ...products]

  const updateProgress = () => {
    const viewport = viewportRef.current
    if (!viewport) return
    const maximum = Math.max(1, viewport.scrollWidth - viewport.clientWidth)
    setProgress(Math.min(1, Math.max(0, viewport.scrollLeft / maximum)))
  }

  const stopMomentum = () => {
    if (momentumRef.current) cancelAnimationFrame(momentumRef.current)
    momentumRef.current = 0
  }

  const glideToProgressTarget = () => {
    if (momentumRef.current) return
    const glide = () => {
      const viewport = viewportRef.current
      if (!viewport) {
        momentumRef.current = 0
        return
      }
      const difference = progressTargetRef.current - viewport.scrollLeft
      if (Math.abs(difference) < 0.35) {
        viewport.scrollLeft = progressTargetRef.current
        updateProgress()
        momentumRef.current = 0
        return
      }
      viewport.scrollLeft += difference * 0.16
      updateProgress()
      momentumRef.current = requestAnimationFrame(glide)
    }
    momentumRef.current = requestAnimationFrame(glide)
  }

  const seekFromProgressPointer = (event) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const rect = event.currentTarget.getBoundingClientRect()
    const markerStart = rect.width * 0.147
    const markerWidth = rect.width * 0.843
    const nextProgress = Math.min(1, Math.max(0, (event.clientX - rect.left - markerStart) / markerWidth))
    progressTargetRef.current = nextProgress * Math.max(0, viewport.scrollWidth - viewport.clientWidth)
    glideToProgressTarget()
  }

  const finishProgressDrag = (event) => {
    if (!progressDragRef.current) return
    progressDragRef.current = false
    setProgressDragging(false)
    try { event.currentTarget.releasePointerCapture(event.pointerId) } catch {}
  }

  const finishDrag = (event) => {
    if (!dragRef.current.active) return
    dragRef.current.active = false
    try { event.currentTarget.releasePointerCapture(event.pointerId) } catch {}
    let velocity = dragRef.current.velocity * 17
    const endGlide = () => {
      momentumRef.current = 0
      setDragging(false)
    }
    const glide = () => {
      const viewport = viewportRef.current
      if (!viewport || Math.abs(velocity) < 0.12) {
        endGlide()
        return
      }
      const before = viewport.scrollLeft
      viewport.scrollLeft += velocity
      updateProgress()
      if (viewport.scrollLeft === before) {
        endGlide()
        return
      }
      velocity *= 0.92
      momentumRef.current = requestAnimationFrame(glide)
    }
    momentumRef.current = requestAnimationFrame(glide)
  }

  useEffect(() => {
    updateProgress()
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('resize', updateProgress)
      stopMomentum()
    }
  }, [])

  return (
    <section className="products section" id="products" data-reveal="product-group">
      <div className="section-heading products-heading" data-reveal="fade">
        <h2 className="reveal-title" data-reveal="words" aria-label="PRODUCT COLLECTION"><RevealWords text="PRODUCT COLLECTION" /></h2>
        <div className="filters" aria-label="Product filters">
          {['OFF-ROAD', 'STREET', 'RACING', 'ACCESSORIES'].map((filter) => (
            <button className={activeFilter === filter ? 'active' : ''} type="button" onClick={() => setActiveFilter(filter)} key={filter}><span>{filter}</span></button>
          ))}
        </div>
      </div>
      <div
        className={`product-viewport${dragging ? ' is-dragging' : ''}`}
        ref={viewportRef}
        onScroll={updateProgress}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          if (event.button !== 0 || event.target.closest('.color-swatch')) return
          stopMomentum()
          const now = performance.now()
          dragRef.current = { active: true, startX: event.clientX, startScroll: event.currentTarget.scrollLeft, lastX: event.clientX, lastTime: now, velocity: 0 }
          setDragging(true)
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          const state = dragRef.current
          if (!state.active) return
          const now = performance.now()
          const elapsed = Math.max(1, now - state.lastTime)
          state.velocity = (state.lastX - event.clientX) / elapsed
          state.lastX = event.clientX
          state.lastTime = now
          event.currentTarget.scrollLeft = state.startScroll - (event.clientX - state.startX)
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div className="product-row">{repeatedProducts.map((item, i) => <ProductCard item={item} key={`${i}-${item.variant}`} />)}</div>
      </div>
      <div className="products-foot">
        <div
          className={`scale-track${progressDragging ? ' is-dragging' : ''}`}
          style={{ '--progress-position': `${14.7 + progress * 84.3}%` }}
          role="slider"
          tabIndex="0"
          aria-label="Product carousel position"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(progress * 100)}
          onPointerDown={(event) => {
            if (event.button !== 0) return
            stopMomentum()
            progressDragRef.current = true
            setProgressDragging(true)
            event.currentTarget.setPointerCapture(event.pointerId)
            seekFromProgressPointer(event)
          }}
          onPointerMove={(event) => {
            if (progressDragRef.current) seekFromProgressPointer(event)
          }}
          onPointerUp={finishProgressDrag}
          onPointerCancel={finishProgressDrag}
          onKeyDown={(event) => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
            event.preventDefault()
            stopMomentum()
            const viewport = viewportRef.current
            if (!viewport) return
            const maximum = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : Math.min(1, Math.max(0, progress + (event.key === 'ArrowRight' ? 0.02 : -0.02)))
            viewport.scrollLeft = next * maximum
            setProgress(next)
          }}
        ><span /></div>
        <ArrowButton>LEARN MORE</ArrowButton>
      </div>
    </section>
  )
}

function EngineeringCardLayer({ index, className = '', active = false, onPrevious, onNext }) {
  const step = engineeringSteps[index]

  return (
    <div
      className={`engineering-card-slide ${className}`}
      role={active ? 'tabpanel' : undefined}
      id={active ? `engineering-panel-${index}` : undefined}
      aria-labelledby={active ? `engineering-tab-${index}` : undefined}
      aria-live={active ? 'polite' : undefined}
      aria-hidden={active ? undefined : 'true'}
    >
      <div className="engineering-image">
        <img
          className="engineering-media"
          src={`${A}${step.image}`}
          alt={active ? step.alt : ''}
        />
      </div>
      <div className="engineering-copy">
        <div className="engineering-copy-slide">
          <span className="counter">{String(index + 1).padStart(2, '0')} /07</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      </div>
      <div className="engineering-arrows">
        <button type="button" tabIndex={active ? 0 : -1} aria-label="Previous engineering capability" onClick={active ? onPrevious : undefined}><img src={`${A}imgFrame2147238906.svg`} alt="" /></button>
        <button type="button" tabIndex={active ? 0 : -1} aria-label="Next engineering capability" onClick={active ? onNext : undefined}><img src={`${A}imgFrame2147238907.svg`} alt="" /></button>
      </div>
    </div>
  )
}

function Engineering() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState(null)
  const [direction, setDirection] = useState('next')
  const [transitionId, setTransitionId] = useState(0)
  const transitionTimerRef = useRef(0)
  const previewIndex = (activeIndex + 1) % engineeringSteps.length

  useEffect(() => () => window.clearTimeout(transitionTimerRef.current), [])

  const changeStep = (nextIndex, nextDirection) => {
    if (nextIndex === activeIndex) return
    window.clearTimeout(transitionTimerRef.current)
    setPreviousIndex(activeIndex)
    setDirection(nextDirection)
    setActiveIndex(nextIndex)
    setTransitionId((value) => value + 1)
    transitionTimerRef.current = window.setTimeout(() => setPreviousIndex(null), 760)
  }

  const selectStep = (nextIndex) => {
    changeStep(nextIndex, nextIndex > activeIndex ? 'next' : 'previous')
  }

  const moveStep = (amount) => {
    const nextIndex = (activeIndex + amount + engineeringSteps.length) % engineeringSteps.length
    changeStep(nextIndex, amount > 0 ? 'next' : 'previous')
  }

  return (
    <section className="engineering section" id="engineering">
      <div className="section-heading engineering-heading" data-reveal="fade">
        <h2 className="reveal-title" data-reveal="words" aria-label="ENGINEERING EXCELLENCE"><RevealWords text="ENGINEERING EXCELLENCE" /></h2>
        <ArrowButton>LEARN MORE</ArrowButton>
      </div>
      <div className="engineering-panel" data-reveal="lift">
        {(previousIndex === null || previousIndex !== previewIndex) && <EngineeringCardLayer key={`preview-${previewIndex}`} index={previewIndex} className="is-preview" />}
        {previousIndex !== null && <EngineeringCardLayer key={`outgoing-${previousIndex}-${transitionId}`} index={previousIndex} className={`is-outgoing is-outgoing-${direction}`} />}
        <EngineeringCardLayer
          key={`active-${activeIndex}-${transitionId}`}
          index={activeIndex}
          className={previousIndex === null ? 'is-active' : `is-entering is-entering-${direction}`}
          active
          onPrevious={() => moveStep(-1)}
          onNext={() => moveStep(1)}
        />
      </div>
      <div className="engineering-rail" aria-hidden="true"><img src={`${A}imgVector12.svg`} alt="" />{engineeringSteps.map((step, i) => <i className={i === activeIndex ? 'active' : ''} key={step.title} />)}</div>
      <aside className="engineering-index" data-reveal="lift" role="tablist" aria-label="Engineering capabilities">
        {engineeringSteps.map((step, i) => (
          <button
            className={i === activeIndex ? 'active' : ''}
            type="button"
            role="tab"
            id={`engineering-tab-${i}`}
            aria-controls={`engineering-panel-${i}`}
            aria-selected={i === activeIndex}
            onClick={() => selectStep(i)}
            key={step.title}
          ><span>{step.title}</span></button>
        ))}
      </aside>
    </section>
  )
}

function About() {
  return (
    <section className="about screen" id="about">
      <video className="about-bg" src={`${A}who-we-are-bg.mp4`} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      <div className="about-overlay" />
      <div className="about-intro" data-reveal="lift"><h2 className="reveal-title" data-reveal="words" aria-label="WHO WE ARE"><RevealWords text="WHO WE ARE" /></h2><p>Premium aluminum alloy wheels crafted for performance</p><ArrowButton>ABOUT US</ArrowButton></div>
      <div className="about-bottom" data-reveal="lift">
        <p className="about-description">VIVE Wheels is built on more than 20 years of expertise in aluminum alloy development and manufacturing. Our foundation lies in material science.</p>
        <div className="stats">{stats.map(([number, label]) => {
          const [, target, suffix] = number.match(/^([\d.]+)(.*)$/)
          const decimals = target.includes('.') ? target.split('.')[1].length : 0
          return <div className="stat" key={label}><strong data-count-target={target} data-count-suffix={suffix} data-count-decimals={decimals} aria-label={number}>{`0${suffix}`}</strong><span>{label}</span></div>
        })}</div>
      </div>
    </section>
  )
}

function Journal() {
  return (
    <section className="journal section" id="journal">
      <div className="section-heading" data-reveal="fade"><h2 className="reveal-title" data-reveal="words" aria-label="JOURNAL"><RevealWords text="JOURNAL" /></h2><ArrowButton>LEARN MORE</ArrowButton></div>
      <div className="journal-grid">
        {journals.map(([image, title], i) => (
          <article className="journal-card" data-reveal="lift" style={{ '--reveal-delay': `${i * 0.07}s` }} key={title}>
            <div className="journal-image"><img src={`${A}${image}`} alt="" /><time dateTime="2026-07-12">2026.7.12</time></div>
            <div className="journal-title"><h3>{title}</h3><img src={`${A}imgFrame2147238930.svg`} alt="" /></div>
          </article>
        ))}
      </div>
    </section>
  )
}

function StoryFlow() {
  const flowRef = useRef(null)

  useEffect(() => {
    const flow = flowRef.current
    if (!flow) return undefined

    let frame = 0
    let flowTop = 0

    const measure = () => {
      flowTop = flow.getBoundingClientRect().top + window.scrollY
      update()
    }

    const update = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight
        const offset = window.scrollY - flowTop
        const clamp = (value) => Math.min(1, Math.max(0, value))
        const engineeringProgress = clamp(offset / viewportHeight)
        const aboutProgress = clamp((offset - viewportHeight) / viewportHeight)
        const journalProgress = clamp((offset - (viewportHeight * 2)) / viewportHeight)
        flow.querySelector('.engineering')?.style.setProperty('--engineering-exit', engineeringProgress.toFixed(4))
        flow.querySelector('.about')?.style.setProperty('--story-progress', aboutProgress.toFixed(4))
        flow.querySelector('.journal')?.style.setProperty('--story-progress', journalProgress.toFixed(4))
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        flow.querySelectorAll('[data-count-target]').forEach((counter, index) => {
          const start = .18 + (index * .055)
          const countProgress = reducedMotion ? 1 : clamp((engineeringProgress - start) / .5)
          const eased = 1 - Math.pow(1 - countProgress, 3)
          const target = Number(counter.dataset.countTarget)
          const decimals = Number(counter.dataset.countDecimals)
          const value = target * eased
          counter.textContent = `${decimals ? value.toFixed(decimals) : Math.round(value)}${counter.dataset.countSuffix}`
        })
        frame = 0
      })
    }

    measure()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="story-flow" ref={flowRef}><Engineering /><About /><div className="story-spacer" aria-hidden="true" /><Journal /></div>
}

function Upgrade() {
  return (
    <section className="upgrade" data-reveal="lift">
      <div className="upgrade-image"><img src={`${A}imgRimBlackMetalGrungeCloseUp3DRendering1.png`} alt="Close-up of a VIVE wheel" /></div>
      <div className="upgrade-copy"><h2 className="reveal-title" data-reveal="words" aria-label="READY TO UPGRADE YOUR WHEELS?"><RevealWords text={'READY TO UPGRADE\nYOUR WHEELS?'} /></h2><p>Connect with us to see how VIVE Wheels can enhance your driving.</p><ArrowButton>CONTACT US</ArrowButton></div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content" data-reveal="lift">
        <div className="footer-nav"><span>NAVI</span><a href="#products">PRODUCTS</a><a href="#about">ABOUT</a><a href="#journal">JOURNAL</a><a href="#footer">FAQS</a></div>
        <div className="footer-contact">
          <div><span>TEL</span><a href="tel:+19499786024">+1 (949) 978-6024</a></div>
          <div><span>EMAIL</span><a href="mailto:info@vivewheels.com">info@vivewheels.com</a></div>
          <div><span>ADDRESS</span><p>Irvine,California,United States</p></div>
        </div>
        <div className="footer-social">
          <span>FOLLOW US</span>
          <div className="social-icons">
            <img className="social-icons-group" src={`${A}imgGroup2085661577.svg`} alt="Facebook, Instagram, YouTube, TikTok, Reddit and Discord" />
            <span className="social-x-cover" aria-hidden="true" />
            <img className="social-x" src={`${A}imgSocialX.png`} alt="X" />
          </div>
          <a href="#footer">Privacy Policy</a><p>© 2026,VIVE. All Rights Reserved.</p>
        </div>
      </div>
      <img className="footer-mark" src={`${A}imgFooterMark.png`} alt="" />
    </footer>
  )
}

function VideoModal({ open, onClose }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}))
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label="Discover VIVE video" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <button className="video-modal-close" type="button" onClick={onClose} aria-label="Close video">×</button>
      <div className="video-modal-frame">
        <video ref={videoRef} src={`${A}scout-hero-11-21.mp4`} poster={`${A}scout-hero-poster.jpg`} controls playsInline preload="metadata" />
      </div>
    </div>
  )
}

function App() {
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    const previousRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'
    const resetToHero = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    resetToHero()
    const firstFrame = requestAnimationFrame(() => {
      resetToHero()
      requestAnimationFrame(resetToHero)
    })
    window.addEventListener('pageshow', resetToHero)
    return () => {
      history.scrollRestoration = previousRestoration
      cancelAnimationFrame(firstFrame)
      window.removeEventListener('pageshow', resetToHero)
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.32, smoothWheel: true, wheelMultiplier: 0.86, touchMultiplier: 1.08 })
    let frame
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [])

  useEffect(() => {
    const revealElements = [...document.querySelectorAll('[data-reveal]')]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })
    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <><main><Hero onOpenVideo={() => setVideoOpen(true)} /><Products /><StoryFlow /><Upgrade /><Footer /></main><VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} /></>
}

createRoot(document.getElementById('root')).render(<App />)
