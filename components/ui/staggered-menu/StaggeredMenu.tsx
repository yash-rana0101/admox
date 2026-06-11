'use client';

import React, { useRef, useState, useEffect } from 'react';
import { StaggeredMenuProps } from './types';
import { useMenuAnimation } from './useMenuAnimation';
import './StaggeredMenu.css';

export function StaggeredMenu(props: StaggeredMenuProps) {
  const {
    position = 'right',
    colors = ['#EEF7E8', '#256951'],
    items = [],
    socialItems = [],
    displaySocials = true,
    displayItemNumbering = true,
    className,
    logoUrl,
    menuButtonColor = '#fff',
    openMenuButtonColor = '#252F2C',
    accentColor = '#256951',
    changeMenuColorOnOpen = true,
    isFixed = false,
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose
  } = props;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarTheme, setNavbarTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
        
        const sections = document.querySelectorAll('section, footer');
        let currentTheme: 'light' | 'dark' = 'dark';
        
        for (let i = 0; i < sections.length; i++) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.top <= 40 && rect.bottom >= 40) {
            const classes = sections[i].className || '';
            const id = sections[i].id || '';
            const isDarkSection = classes.includes('bg-brand-onyx') || 
                                 classes.includes('bg-black') || 
                                 classes.includes('bg-[#101514]') ||
                                 id === 'trustbar' || 
                                 id === 'about' || 
                                 id === 'cta' ||
                                 sections[i].tagName.toLowerCase() === 'footer';
            currentTheme = isDarkSection ? 'light' : 'dark';
            break;
          }
        }
        setNavbarTheme(currentTheme);
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const refs = {
    panelRef,
    preLayersRef,
    plusHRef,
    plusVRef,
    iconRef,
    textInnerRef,
    toggleBtnRef
  };

  const { textLines, toggleMenu, closeMenu } = useMenuAnimation(open, setOpen, props, refs);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={`${className ? className + ' ' : ''}staggered-menu-wrapper${isFixed ? ' fixed-wrapper' : ''}`}
      style={accentColor ? ({ '--sm-accent': accentColor } as React.CSSProperties) : undefined}
      data-position={position}
      data-open={open || undefined}
      data-theme={navbarTheme}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#EEF7E8', '#256951'];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => (
            <div key={i} className="sm-prelayer" style={{ background: c }} />
          ));
        })()}
      </div>
      
      <header className={`staggered-menu-header ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation header">
        <div className="sm-logo" aria-label="Logo">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              className="sm-logo-img"
              draggable={false}
              width={110}
              height={24}
            />
          ) : (
            <div className="flex items-center gap-2.5 group select-none cursor-pointer">
              <img
                src="/logo-bgrm.png"
                alt="Logo"
                className="w-14 h-14 object-contain transition-transform duration-500 group-hover:rotate-12"
                draggable={false}
              />
              <span className="font-sora text-base font-bold tracking-tight">
                Admox<span className="text-brand-teal font-light">Media</span>
              </span>
            </div>
          )}
        </div>
        
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a 
                    className="sm-panel-item" 
                    href={it.link} 
                    aria-label={it.ariaLabel} 
                    data-index={idx + 1}
                    onClick={() => closeMenu()}
                  >
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default StaggeredMenu;
