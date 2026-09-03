'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  Brain,
  ChevronRight,
  FileText,
  GraduationCap,
  Rocket,
  Sparkles,
} from 'lucide-react';

import './RadialOrbitalTimeline.css';

const ICONS = {
  college: GraduationCap,
  bangkit: Brain,
  research: FileText,
  graduate: Award,
  next: Rocket,
};

export default function RadialOrbitalTimeline({
  timelineData = [],
}) {
  const [activeId, setActiveId] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate || activeId !== null) return;

    const interval = setInterval(() => {
      setRotation((current) => {
        const next = current + 0.18;
        return next >= 360 ? next - 360 : next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [autoRotate, activeId]);

  const activeItem = useMemo(() => {
    return (
      timelineData.find(
        (item) => item.id === activeId
      ) || null
    );
  }, [timelineData, activeId]);

  const handleNodeClick = (item) => {
    if (activeId === item.id) {
      setActiveId(null);
      setAutoRotate(true);
      return;
    }

    setActiveId(item.id);
    setAutoRotate(false);
  };

  const closeActive = () => {
    setActiveId(null);
    setAutoRotate(true);
  };

  const getPosition = (index) => {
    const total = timelineData.length;

    if (!total) {
      return {
        x: 0,
        y: 0,
        depth: 1,
      };
    }

    const angle =
      (index / total) * Math.PI * 2 +
      (rotation * Math.PI) / 180;

    const radius = 215;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    const depth =
      0.65 +
      ((Math.sin(angle) + 1) / 2) * 0.35;

    return {
      x,
      y,
      depth,
    };
  };

  const getIcon = (item) => {
    if (item.icon) return item.icon;

    return ICONS[item.type] || Sparkles;
  };

  return (
    <div className="rotl">
      {/* Background */}
      <div className="rotl__background">
        <div className="rotl__grid" />
        <div className="rotl__glow rotl__glow--one" />
        <div className="rotl__glow rotl__glow--two" />
      </div>

      {/* Main stage */}
      <div className="rotl__stage">

        {/* Orbital rings */}
        <div className="rotl__ring rotl__ring--outer" />
        <div className="rotl__ring rotl__ring--inner" />
        <div className="rotl__orbit-dash" />

        {/* Center */}
        <div
          className={`rotl__center ${
            activeId
              ? 'rotl__center--active'
              : ''
          }`}
        >
          <div className="rotl__center-ring" />

          <div className="rotl__center-content">
            <Sparkles size={15} />

            <span>JOURNEY</span>

            <strong>2022 →</strong>
          </div>
        </div>

        {/* Nodes */}
        {timelineData.map((item, index) => {
          const position = getPosition(index);
          const Icon = getIcon(item);

          const isActive =
            activeId === item.id;

          return (
            <div
              key={item.id}
              className={`rotl__node-wrapper ${
                isActive
                  ? 'rotl__node-wrapper--active'
                  : ''
              }`}
              style={{
                transform: `
                  translate(
                    calc(-50% + ${position.x}px),
                    calc(-50% + ${position.y}px)
                  )
                  scale(${isActive ? 1.18 : position.depth})
                `,
                zIndex: isActive
                  ? 100
                  : Math.round(
                      position.depth * 50
                    ),
                opacity: isActive
                  ? 1
                  : position.depth,
              }}
              onClick={(event) => {
                event.stopPropagation();
                handleNodeClick(item);
              }}
            >
              <div className="rotl__node-glow" />

              <button
                type="button"
                className={`rotl__node ${
                  isActive
                    ? 'rotl__node--active'
                    : ''
                }`}
                aria-label={`Open ${item.title}`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.7}
                />

                {item.status === 'current' && (
                  <span className="rotl__current-dot" />
                )}
              </button>

              {/* Label */}
              <div
                className={`rotl__label ${
                  isActive
                    ? 'rotl__label--active'
                    : ''
                }`}
              >
                <span className="rotl__label-date">
                  {item.date}
                </span>

                <strong>
                  {item.title}
                </strong>
              </div>
            </div>
          );
        })}

        {/* Detail */}
        {activeItem && (
          <div
            className="rotl__detail"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="rotl__detail-close"
              onClick={closeActive}
              aria-label="Close"
            >
              ×
            </button>

            <div className="rotl__detail-top">
              <div className="rotl__detail-icon">
                {(() => {
                  const Icon =
                    getIcon(activeItem);

                  return (
                    <Icon
                      size={17}
                      strokeWidth={1.7}
                    />
                  );
                })()}
              </div>

              <div>
                <span>
                  {activeItem.category}
                </span>

                <h3>
                  {activeItem.title}
                </h3>
              </div>
            </div>

            <div className="rotl__detail-line" />

            <p className="rotl__detail-text">
              {activeItem.content}
            </p>

            {activeItem.highlight && (
              <div className="rotl__highlight">
                <span>
                  {activeItem.highlightLabel ||
                    'HIGHLIGHT'}
                </span>

                <strong>
                  {activeItem.highlight}
                </strong>
              </div>
            )}

            {activeItem.related?.length > 0 && (
              <div className="rotl__related">
                <span>
                  Related
                </span>

                <div>
                  {activeItem.related.map(
                    (relatedId) => {
                      const relatedItem =
                        timelineData.find(
                          (entry) =>
                            entry.id ===
                            relatedId
                        );

                      if (!relatedItem) {
                        return null;
                      }

                      return (
                        <button
                          key={relatedId}
                          type="button"
                          onClick={() =>
                            handleNodeClick(
                              relatedItem
                            )
                          }
                        >
                          {
                            relatedItem.title
                          }

                          <ChevronRight
                            size={11}
                          />
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            <div className="rotl__detail-date">
              <span>
                {activeItem.date}
              </span>

              <ArrowRight size={12} />

              <span>
                {activeItem.status ===
                'current'
                  ? 'CURRENT CHAPTER'
                  : 'MILESTONE'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Hint */}
      <div className="rotl__hint">
        <span className="rotl__hint-dot" />

        <span>
          Select a milestone to explore
        </span>
      </div>
    </div>
  );
}