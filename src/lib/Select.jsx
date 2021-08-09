/* eslint jsx-a11y/no-noninteractive-element-to-interactive-role: 0 */
import React, { Component } from 'react';
import classNames from 'classnames';
import raf from 'raf';

const scrollTo = (element, to, duration) => {
  // jump to target if duration zero
  if (duration <= 0) {
    raf(() => {
      // eslint-disable-next-line no-param-reassign
      element.scrollTop = to;
    });
    return;
  }
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;

  raf(() => {
    // eslint-disable-next-line no-param-reassign
    element.scrollTop += perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  });
};

class Select extends Component {
  state = {
    active: false,
  };

  componentDidMount() {
    // jump to selected option
    this.scrollToSelected(0);
  }

  componentDidUpdate(prevProps) {
    const { selectedIndex } = this.props;
    // smooth scroll to selected option
    if (prevProps.selectedIndex !== selectedIndex) {
      this.scrollToSelected(120);
    }
  }

  onSelect = value => {
    const { onSelect, type } = this.props;
    onSelect(type, value);
  };

  getOptions() {
    const { options, selectedIndex, prefixCls, onEsc, onArrowRight, onArrowLeft, onArrowDown, onArrowUp } = this.props;
    return options.map((item, index) => {
      const cls = classNames({
        [`${prefixCls}-select-option-selected`]: selectedIndex === index,
        [`${prefixCls}-select-option-disabled`]: item.disabled,
      });

      const onClick = item.disabled
        ? undefined
        : (e) => {
            this.onSelect(item.value);
            e.stopPropagation();
            return false;
          };

      const onKeyDown = (e) => {
        
        if(e.key === "Enter"){
          onClick(e)
        }
        else if(e.key === "Escape"){
          onEsc()
        }
        else if(e.key === "ArrowRight"){
          onArrowRight()
        }
        else if(e.key === "ArrowLeft"){
          onArrowLeft()
        }
        else if(e.key === "ArrowDown"){
          onArrowDown(e)
        }
        else if(e.key === "ArrowUp"){
          onArrowUp(e)
        }
        e.stopPropagation();
        return false;
      }
      
      return (
        <li
          role="option"
          onClick={onClick}
          onKeyDown={onKeyDown}
          className={cls}
          key={index} // eslint-disable-line react/no-array-index-key
          disabled={item.disabled}
          tabIndex="0"
          aria-label={item.value}
        >
          {item.value}
        </li>
      );
    });
  }

  handleMouseEnter = e => {
    const { onMouseEnter } = this.props;
    this.setState({ active: true });
    onMouseEnter(e);
  };

  handleMouseLeave = () => {
    this.setState({ active: false });
  };

  saveRoot = node => {
    this.root = node;
  };

  saveList = node => {
    this.list = node;
  };

  scrollToSelected(duration) {
    // move to selected item
    const { selectedIndex } = this.props;
    if (!this.list) {
      return;
    }
    let index = selectedIndex;
    if (index < 0) {
      index = 0;
    }
    const topOption = this.list.children[index];
    const to = topOption.offsetTop;
    scrollTo(this.root, to, duration);
  }

  render() {
    const { prefixCls, options, ariaLabel, type } = this.props;
    const { active } = this.state;
    if (options.length === 0) {
      return null;
    }
    const cls = classNames(`${prefixCls}-select`, {
      [`${prefixCls}-select-active`]: active,
    });
    return (
      <div
        className={cls + " " + type}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={this.saveRoot}
      >
        <ul className={"lc-time-picker-ul-"+type} ref={this.saveList} tabIndex="0" role="listbox" aria-label={ariaLabel}>{this.getOptions()}</ul>
      </div>
    );
  }
}

export default Select;
