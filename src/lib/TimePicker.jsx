import React, { Component } from 'react';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import Panel from './Panel';
import placements from './placements';

function noop() {}

function refFn(field, component) {
  this[field] = component;
}

class Picker extends Component {
  static defaultProps = {
    clearText: 'clear',
    prefixCls: 'rc-time-picker',
    defaultOpen: false,
    inputReadOnly: false,
    style: {},
    className: '',
    inputClassName: '',
    popupClassName: '',
    popupStyle: {},
    align: {},
    defaultOpenValue: new Date(),
    allowEmpty: true,
    showHour: true,
    showMinute: true,
    showSecond: true,
    disabledHours: noop,
    disabledMinutes: noop,
    disabledSeconds: noop,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    onChange: noop,
    onAmPmChange: noop,
    onOpen: noop,
    onClose: noop,
    onFocus: noop,
    onBlur: noop,
    addon: noop,
    use12Hours: false,
    focusOnOpen: false,
    onKeyDown: noop,
    ariaLabelInput: "Select time",
    ariaLabelSelectHours: "Select hours",
    ariaLabelSelectMinutes: "Select minutes",
    ariaLabelSelectSeconds: "Select seconds",
    ariaLabelSelectAMPM: "Select AM or PM"
  };

  constructor(props) {
    super(props);
    this.saveInputRef = refFn.bind(this, 'picker');
    this.savePanelRef = refFn.bind(this, 'panelInstance');
    const { defaultOpen, defaultValue, open = defaultOpen, value = defaultValue } = props;
    this.state = {
      open,
      value,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if ('value' in props) {
      newState.value = props.value;
    }
    if (props.open !== undefined) {
      newState.open = props.open;
    }
    return Object.keys(newState).length > 0
      ? {
          ...state,
          ...newState,
        }
      : null;
  }

  onPanelChange = value => {
    this.setValue(value);
  };

  onAmPmChange = ampm => {
    const { onAmPmChange } = this.props;
    onAmPmChange(ampm);
  };

  onClear = event => {
    event.stopPropagation();
    this.setValue(null);
    this.setOpen(false);
  };

  onVisibleChange = open => {
    this.setOpen(open);
    if(open){
      setTimeout(() => {
        if(document.querySelector(".rc-time-picker-panel-inner li.rc-time-picker-panel-select-option-selected")){
          document.querySelector(".rc-time-picker-panel-inner li.rc-time-picker-panel-select-option-selected").focus({preventScroll:true});
        }
      })
    }
  };

  onEsc = () => {
    this.setOpen(false);
    this.focus();
  };

  onKeyDown = e => {
    if (e.key === "Enter") {
      this.setOpen(true);
    }
    e.stopPropagation();
    return false;
  };

  setValue(value) {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    onChange(value);
  }

  getFormat() {
    const { format, showHour, showMinute, showSecond, use12Hours } = this.props;
    if (format) {
      return format;
    }

    if (use12Hours) {
      const fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
        .filter(item => !!item)
        .join(':');

      return fmtString.concat(' a');
    }

    return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
      .filter(item => !!item)
      .join(':');
  }

  getPanelElement() {
    const {
      prefixCls,
      placeholder,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      hideDisabledOptions,
      inputReadOnly,
      showHour,
      showMinute,
      showSecond,
      defaultOpenValue,
      clearText,
      addon,
      use12Hours,
      focusOnOpen,
      onKeyDown,
      hourStep,
      minuteStep,
      secondStep,
      clearIcon,
      ariaLabelSelectHours,
      ariaLabelSelectMinutes,
      ariaLabelSelectSeconds,
      ariaLabelSelectAMPM
    } = this.props;
    const { value } = this.state;
    return (
      <Panel
        clearText={clearText}
        prefixCls={`${prefixCls}-panel`}
        ref={this.savePanelRef}
        value={value}
        inputReadOnly={inputReadOnly}
        onChange={this.onPanelChange}
        onAmPmChange={this.onAmPmChange}
        defaultOpenValue={defaultOpenValue}
        showHour={showHour}
        showMinute={showMinute}
        showSecond={showSecond}
        onEsc={this.onEsc}
        format={this.getFormat()}
        placeholder={placeholder}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
        hideDisabledOptions={hideDisabledOptions}
        use12Hours={use12Hours}
        hourStep={hourStep}
        minuteStep={minuteStep}
        secondStep={secondStep}
        addon={addon}
        focusOnOpen={focusOnOpen}
        onKeyDown={onKeyDown}
        clearIcon={clearIcon}
        ariaLabelSelectHours={ariaLabelSelectHours}
        ariaLabelSelectMinutes={ariaLabelSelectMinutes}
        ariaLabelSelectSeconds={ariaLabelSelectSeconds}
        ariaLabelSelectAMPM={ariaLabelSelectAMPM}
      />
    );
  }

  getPopupClassName() {
    const { showHour, showMinute, showSecond, use12Hours, prefixCls, popupClassName } = this.props;
    let selectColumnCount = 0;
    if (showHour) {
      selectColumnCount += 1;
    }
    if (showMinute) {
      selectColumnCount += 1;
    }
    if (showSecond) {
      selectColumnCount += 1;
    }
    if (use12Hours) {
      selectColumnCount += 1;
    }
    // Keep it for old compatibility
    return classNames(
      popupClassName,
      {
        [`${prefixCls}-panel-narrow`]: (!showHour || !showMinute || !showSecond) && !use12Hours,
      },
      `${prefixCls}-panel-column-${selectColumnCount}`,
    );
  }

  setOpen(open) {
    const { onOpen, onClose } = this.props;
    const { open: currentOpen } = this.state;
    if (currentOpen !== open) {
      if (!('open' in this.props)) {
        this.setState({ open });
      }
      if (open) {
        onOpen({ open });
      } else {
        onClose({ open });
      }
    }
  }

  focus() {
    this.picker.focus();
  }

  blur() {
    this.picker.blur();
  }

  renderClearButton() {
    const { value } = this.state;
    const { prefixCls, allowEmpty, clearIcon, clearText, disabled } = this.props;
    if (!allowEmpty || !value || disabled) {
      return null;
    }

    if (React.isValidElement(clearIcon)) {
      const { onClick } = clearIcon.props || {};
      return React.cloneElement(clearIcon, {
        onClick: (...args) => {
          if (onClick) onClick(...args);
          this.onClear(...args);
        },
      });
    }

    return (
      <button
        className={`${prefixCls}-clear`}
        title={clearText}
        onClick={this.onClear}
        tabIndex={0}
      >
        {clearIcon || <i className={`${prefixCls}-clear-icon`} />}
      </button>
    );
  }

  render() {
    const {
      prefixCls,
      placeholder,
      placement,
      align,
      id,
      disabled,
      transitionName,
      style,
      className,
      inputClassName,
      getPopupContainer,
      name,
      autoComplete,
      onFocus,
      onBlur,
      autoFocus,
      inputReadOnly,
      inputIcon,
      popupStyle,
      ariaLabelInput
    } = this.props;
    const { open, value } = this.state;
    const popupClassName = this.getPopupClassName();
    
    return (
      <Trigger
        prefixCls={`${prefixCls}-panel`}
        popupClassName={popupClassName}
        popupStyle={popupStyle}
        popup={this.getPanelElement()}
        popupAlign={align}
        builtinPlacements={placements}
        popupPlacement={placement}
        action={disabled ? [] : ['click']}
        destroyPopupOnHide
        getPopupContainer={getPopupContainer}
        popupTransitionName={transitionName}
        popupVisible={open}
        onPopupVisibleChange={this.onVisibleChange}
      >
        <span className={classNames(prefixCls, className)} style={style}>
          <input
            className={classNames(`${prefixCls}-input`, inputClassName)}
            ref={this.saveInputRef}
            type="text"
            placeholder={placeholder}
            name={name}
            onKeyDown={this.onKeyDown}
            disabled={disabled}
            value={(value && value.format(this.getFormat())) || ''}
            autoComplete={autoComplete}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
            onChange={noop}
            readOnly={!!inputReadOnly}
            id={id}
            role="button"
            aria-label={ariaLabelInput}
            tabIndex="0"
          />
          {inputIcon || <span className={`${prefixCls}-icon`} />}
          {this.renderClearButton()}
        </span>
      </Trigger>
    );
  }
}

export default Picker;
