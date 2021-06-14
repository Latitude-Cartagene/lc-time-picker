import React, { Component } from 'react';
import Select from './Select';

const formatOption = (option, disabledOptions) => {
  let value = `${option}`;
  if (option < 10) {
    value = `0${option}`;
  }

  let disabled = false;
  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value,
    disabled,
  };
};

class Combobox extends Component {
  onItemChange = (type, itemValue) => {
    const {
      onChange,
      defaultOpenValue,
      use12Hours,
      value: propValue,
      isAM,
      onAmPmChange,
    } = this.props;
    const value = (propValue || defaultOpenValue).clone();

    if (type === 'hour') {
      if (use12Hours) {
        if (isAM) {
          value.setHours(+itemValue % 12);
        } else {
          value.setHours((+itemValue % 12) + 12);
        }
      } else {
        value.setHours(+itemValue);
      }
    } else if (type === 'minute') {
      value.setMinutes(+itemValue);
    } else if (type === 'ampm') {
      const ampm = itemValue.toUpperCase();
      if (use12Hours) {
        if (ampm === 'PM' && value.getHours() < 12) {
          value.setHours((value.getHours() % 12) + 12);
        }

        if (ampm === 'AM') {
          if (value.getHours() >= 12) {
            value.setHours(value.getHours() - 12);
          }
        }
      }
      onAmPmChange(ampm);
    } else {
      value.setSeconds(+itemValue);
    }
    onChange(value);
  };

  onEnterSelectPanel = range => {
    const { onCurrentSelectPanelChange } = this.props;
    onCurrentSelectPanelChange(range);
  };

  getHourSelect(hour) {
    const { prefixCls, hourOptions, disabledHours, showHour, use12Hours, onEsc, ariaLabelSelectHours } = this.props;
    if (!showHour) {
      return null;
    }
    const disabledOptions = disabledHours();
    let hourOptionsAdj;
    let hourAdj;
    if (use12Hours) {
      hourOptionsAdj = [12].concat(hourOptions.filter(h => h < 12 && h > 0));
      hourAdj = hour % 12 || 12;
    } else {
      hourOptionsAdj = hourOptions;
      hourAdj = hour;
    }

    const onArrowRight = () => {
      const elToFocus = document.querySelector(".lc-time-picker-ul-minute li.rc-time-picker-panel-select-option-selected");
      if(elToFocus){
        elToFocus.focus();
      }
      else{
        document.querySelector(".lc-time-picker-ul-minute li:first-child").focus()
      }
    }
    const onArrowLeft = () => {

    }
    const onArrowDown = (e) => {
      if(e && e.target && e.target.nextElementSibling){
        e.target.nextElementSibling.focus()
      }
    }
    const onArrowUp = (e) => {
      if(e && e.target && e.target.previousElementSibling){
        e.target.previousElementSibling.focus()
      }
    }

    return (
      <Select
        prefixCls={prefixCls}
        options={hourOptionsAdj.map(option => formatOption(option, disabledOptions))}
        selectedIndex={hourOptionsAdj.indexOf(hourAdj)}
        type="hour"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('hour')}
        onEsc={onEsc}
        ariaLabel={ariaLabelSelectHours}
        onArrowRight={onArrowRight}
        onArrowLeft={onArrowLeft}
        onArrowDown={onArrowDown}
        onArrowUp={onArrowUp}
      />
    );
  }

  getMinuteSelect(minute) {
    const {
      prefixCls,
      minuteOptions,
      disabledMinutes,
      defaultOpenValue,
      showMinute,
      value: propValue,
      onEsc,
      ariaLabelSelectMinutes
    } = this.props;
    if (!showMinute) {
      return null;
    }
    const value = propValue || defaultOpenValue;
    const disabledOptions = disabledMinutes(value.getHours());

    const onArrowRight = () => {

    }
    const onArrowLeft = () => {
      const elToFocus = document.querySelector(".lc-time-picker-ul-hour li.rc-time-picker-panel-select-option-selected");
      if(elToFocus){
        elToFocus.focus();
      }
      else{
        document.querySelector(".lc-time-picker-ul-hour li:first-child").focus()
      }
    }

    const onArrowDown = (e) => {
      if(e && e.target && e.target.nextElementSibling){
        e.target.nextElementSibling.focus()
      }
    }
    const onArrowUp = (e) => {
      if(e && e.target && e.target.previousElementSibling){
        e.target.previousElementSibling.focus()
      }
    }

    return (
      <Select
        prefixCls={prefixCls}
        options={minuteOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={minuteOptions.indexOf(minute)}
        type="minute"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('minute')}
        onEsc={onEsc}
        ariaLabel={ariaLabelSelectMinutes}
        onArrowRight={onArrowRight}
        onArrowLeft={onArrowLeft}
        onArrowDown={onArrowDown}
        onArrowUp={onArrowUp}
      />
    );
  }

  getSecondSelect(second) {
    const {
      prefixCls,
      secondOptions,
      disabledSeconds,
      showSecond,
      defaultOpenValue,
      value: propValue,
      onEsc,
      ariaLabelSelectSeconds
    } = this.props;
    if (!showSecond) {
      return null;
    }
    const value = propValue || defaultOpenValue;
    const disabledOptions = disabledSeconds(value.getHours(), value.getMinutes());

    const onArrowRight = () => {

    }
    const onArrowLeft = () => {

    }

    return (
      <Select
        prefixCls={prefixCls}
        options={secondOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={secondOptions.indexOf(second)}
        type="second"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('second')}
        onEsc={onEsc}
        ariaLabel={ariaLabelSelectSeconds}
        onArrowRight={onArrowRight}
        onArrowLeft={onArrowLeft}
      />
    );
  }

  getAMPMSelect() {
    const { prefixCls, use12Hours, format, isAM, onEsc, ariaLabelSelectAMPM } = this.props;
    if (!use12Hours) {
      return null;
    }

    const AMPMOptions = ['am', 'pm'] // If format has A char, then we should uppercase AM/PM
      .map(c => (format.match(/\sA/) ? c.toUpperCase() : c))
      .map(c => ({ value: c }));

    const selected = isAM ? 0 : 1;

    return (
      <Select
        prefixCls={prefixCls}
        options={AMPMOptions}
        selectedIndex={selected}
        type="ampm"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('ampm')}
        onEsc={onEsc}
        ariaLabel={ariaLabelSelectAMPM}
      />
    );
  }

  render() {
    const { prefixCls, defaultOpenValue, value: propValue } = this.props;
    const value = propValue || defaultOpenValue;
    return (
      <div className={`${prefixCls}-combobox`}>
        {this.getHourSelect(value.getHours())}
        {this.getMinuteSelect(value.getMinutes())}
        {this.getSecondSelect(value.getSeconds())}
        {this.getAMPMSelect(value.getHours())}
      </div>
    );
  }
}

export default Combobox;