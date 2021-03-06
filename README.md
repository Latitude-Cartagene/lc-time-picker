# TimePicker

React Time Picker in native javascript date.


install
-------

```
npm install @Latitude-cartagene/lc-time-picker
```

Usage
-----

```
import TimePicker from '@Latitude-cartagene/lc-time-picker';

```

API
---

### TimePicker

| Name                    | Type                              | Default | Description |
|-------------------------|-----------------------------------|---------|-------------|
| prefixCls               | String                            | 'rc-time-picker' | prefixCls of this component |
| clearText               | String                            | 'clear' | clear tooltip of icon |
| disabled                | Boolean                           | false   | whether picker is disabled |
| allowEmpty              | Boolean                           | true | allow clearing text |
| open                    | Boolean                           | false | current open state of picker. controlled prop |
| defaultValue            | Date object                       | null | default initial value |
| defaultOpenValue        | Date object                       | new Date() | default open panel value, used to set utcOffset,locale if value/defaultValue absent |
| value                   | Date object                       | null | current value |
| placeholder             | String                            | '' | time input's placeholder |
| className               | String                            | '' | time picker className |
| inputClassName          | String                            | '' | time picker input element className |
| id                      | String                            | '' | time picker id |
| popupClassName          | String                            | '' | time panel className |
| popupStyle              | object                            | {} | customize popup style
| showHour                | Boolean                           | true | whether show hour | |
| showMinute              | Boolean                           | true | whether show minute |
| showSecond              | Boolean                           | true | whether show second |
| format                  | String                            | - | HH:mm or HH:mm:ss |
| disabledHours           | Function                          | - | disabled hour options |
| disabledMinutes         | Function                          | - | disabled minute options |
| disabledSeconds         | Function                          | - | disabled second options |
| use12Hours              | Boolean                           | false | 12 hours display mode |
| hideDisabledOptions     | Boolean                           | false | whether hide disabled options |
| onChange                | Function                          | null | called when time-picker a different value |
| onAmPmChange            | Function                          | null | called when time-picker an am/pm value |
| addon                   | Function                          | - | called from timepicker panel to render some addon to its bottom, like an OK button. Receives panel instance as parameter, to be able to close it like `panel.close()`.|
| placement               | String                            | bottomLeft | one of ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] |
| transitionName          | String                            | ''  |  |
| name                    | String                            | - | sets the name of the generated input |
| onOpen                  | Function({ open })                |   | when TimePicker panel is opened      |
| onClose                 | Function({ open })                |   | when TimePicker panel is closed      |
| hourStep                | Number                            | 1 | interval between hours in picker  |
| minuteStep              | Number                            | 1 | interval between minutes in picker  |
| secondStep              | Number                            | 1 | interval between seconds in picker  |
| focusOnOpen             | Boolean                           | false | automatically focus the input when the picker opens |
| inputReadOnly           | Boolean                           | false | set input to read only |
| inputIcon               | ReactNode                         |  | specific the time-picker icon. |
| clearIcon               | ReactNode                         |  | specific the clear icon. |
| ariaLabelInput          | String                            | 'Select time' | specific the aria-label of input |
| ariaLabelSelectHours    | String                            | 'Select hours' | specific the aria-label of the hours select |
| ariaLabelSelectMinutes    | String                            | 'Select minutes' | specific the aria-label of the minutes select |
| ariaLabelSelectSeconds    | String                            | 'Select seconds' | specific the aria-label of the seconds select |
| ariaLabelSelectAMPM    | String                            | 'Select AM or PM' | specific the aria-label of the AM/PM select |




