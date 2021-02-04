import './index.css';
import TimePicker from "./TimePicker";

// eslint-disable-next-line no-extend-native
Date.prototype.format = function(format) {
  const hour = this.getHours() < 10 ? "0"+this.getHours() : this.getHours();
  const minute = this.getMinutes() < 10 ? "0"+this.getMinutes() : this.getMinutes();
  const second = this.getSeconds() < 10 ? "0"+this.getSeconds() : this.getSeconds();
  switch(format){
    case "HH:mm":
      return hour + ":"+minute; 
    case "h:mm a":
      return (hour%12) + ":"+minute + " " + (this.getHours() < 12 ? "am" : "pm"); 
    case "h:mm:ss a":
      return (hour%12) + ":"+minute+":"+second + " " + (this.getHours() < 12 ? "am" : "pm"); 
    default:
      return hour + ":"+minute+":"+second;
  }
};
// eslint-disable-next-line no-extend-native
Date.prototype.clone = function() { return new Date(this.getTime()); };


export {TimePicker};