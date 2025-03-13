import clsx from 'clsx';
import { animate } from 'framer-motion';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

type AnimatedProgressProps = ComponentPropsWithoutRef<'progress'>;

export const AnimatedProgress = forwardRef<HTMLProgressElement, AnimatedProgressProps>(
  function Progress(props, ref) {
    const { value, max, style, className, ...otherProps } = props;
    const progressRef = useRef<HTMLProgressElement>(null);
    const prevValue = useRef(value);

    useImperativeHandle(ref, () => progressRef.current!, []);

    useEffect(() => {
      const progressElement = progressRef.current;

      if (value == null || progressElement == null) return;

      const controller = animate(prevValue.current, value, {
        duration: 0.3,
        ease: 'easeInOut',
        onUpdate(value) {
          progressElement.value = value as number;
          prevValue.current = value;
        },
      });

      return () => controller.stop();
    }, [ref, value]);

    return (
      <progress
        ref={progressRef}
        value={value}
        max={max}
        style={style}
        className={clsx('progress', className)}
        {...otherProps}
      ></progress>
    );
  },
);
