import clsx from 'clsx';
import { ComponentPropsWithoutRef, MouseEventHandler, ReactNode, useRef, useState } from 'react';
import { useDispose } from '~/shared/hooks';

type HTMLButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'>;

interface DelayButtonProps extends HTMLButtonProps {
  children: ReactNode | ((delayed: boolean) => ReactNode);
  delay: number;
  getButtonProps: (delayed: boolean) => HTMLButtonProps;
}

export const DelayButton = (props: DelayButtonProps) => {
  const {
    children: _children,
    delay = 1000,
    getButtonProps,
    onClick: _onClick,
    style: _style,
    className: _className,
    ...defaultProps
  } = props;

  const [delayed, setDelayed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useDispose(() => {
    const timeoutId = timeoutRef.current;

    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
  });

  const buttonProps = getButtonProps(delayed);
  const onClick = buttonProps.onClick ?? _onClick;
  const className = clsx(_className, buttonProps.className);
  const style = { ..._style, ...buttonProps.style };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    setDelayed(true);

    timeoutRef.current = setTimeout(() => {
      setDelayed(false);
    }, delay);
  };

  const children = typeof _children === 'function' ? _children(delayed) : _children;

  return (
    <button
      {...defaultProps}
      {...getButtonProps(delayed)}
      style={style}
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
