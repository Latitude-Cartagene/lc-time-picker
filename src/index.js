import React from 'react';
import ReactDOM from 'react-dom';
import './lib/index.css';
import {TimePicker} from "./lib/index"

const language = "fr"

const onChange = (value) => {
  console.log("onChange", value)
}

ReactDOM.render(
  <React.StrictMode>
    <div>
    <TimePicker
        style={{
          position: "relative",
        }}
        className="lc-time-picker"
        popupClassName="lc-time-picker-popup"
        defaultValue={new Date()}
        placement={"bottomLeft"}
        use12Hours={language === "en"}
        showSecond={false}
        minuteStep={5}
        allowEmpty={false}
        inputReadOnly
        onChange={onChange}
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);