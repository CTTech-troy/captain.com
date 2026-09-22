import React, { PointerEvent, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { CaptainSymbol } from '../brand/CaptainSymbol';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceIcon } from '../ui/ServiceIcon';
import { productCategories } from '../../data/products';
import { cn } from '../../utils/cn';

export function ProductsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{x: number;left: number;moved: boolean;} | null>(null);
  const [dragging, setDragging] = useState(false);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const amount = card ? card.getBoundingClientRect().width + 16 : 320;
    track.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !trackRef.current) return;
    drag.current = { x: event.clientX, left: trackRef.current.scrollLeft, moved: false };
    trackRef.current.setPointerCapture(event.pointerId);
    setDragging(true);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !trackRef.current) return;
    const delta = event.clientX - drag.current.x;
    if (Math.abs(delta) > 3) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.left - delta;
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !trackRef.current) return;
    trackRef.current.releasePointerCapture(event.pointerId);
    drag.current = null;
    setDragging(false);
  };

  return (
    <section aria-labelledby="products-title" className="overflow-hidden bg-white py-28 md:py-36">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            id="products-title"
            label="Products"
            title="Built by Captain."
            highlight={['captain.']}
            support="We are developing proprietary products from what we learn in the field. Nothing is announced yet — these are the categories we are exploring." />
          
          <div className="flex gap-2 lg:col-span-5 lg:justify-self-end">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous product categories"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-forest-800 hover:bg-forest-800 hover:text-white">
              
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next product categories"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-forest-800 hover:bg-forest-800 hover:text-white">
              
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          data-cursor="drag"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={cn('no-scrollbar -mx-5 mt-14 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0', dragging ? 'select-none' : 'snap-x snap-mandatory')}
          tabIndex={0}
          aria-label="Future product categories, scrollable">
          
          <ul className="flex gap-4">
            {productCategories.map((product) =>
            <li
              key={product.id}
              className="relative flex min-h-[340px] w-[290px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-dashed border-forest-200 bg-soft p-7 md:w-[360px]">
              
                <CaptainSymbol size={200} strokeWidth={3} showAccent={false} className="pointer-events-none absolute -bottom-16 -right-16 text-forest-100" />
                <div className="relative flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-forest-800">
                    <ServiceIcon name={product.icon} className="h-5 w-5" />
                  </span>
                  <span className="label-mono flex items-center gap-2 text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-lemon-600" aria-hidden="true" />
                    In development
                  </span>
                </div>
                <h3 className="relative mt-10 font-display text-[24px] font-semibold leading-tight tracking-[-0.02em] text-ink">{product.title}</h3>
                <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{product.body}</p>
                <p className="label-mono relative mt-auto pt-8 text-forest-700">To be announced</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>);

}