import * as React from "react";
import * as moment from "moment";

type State = {
  currentMoment: moment.Moment;
};

interface Props {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string, moment: moment.Moment) => void;
}

const momentFormat = "HH:mm";

export default class TimeInput extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const value = this.props.value || this.props.defaultValue || "";

    this.state = {
      currentMoment: moment(value, momentFormat)
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.value &&
      this.state.currentMoment.format(momentFormat).toString() !==
        nextProps.value
    ) {
      this.setState({
        currentMoment: moment(nextProps.value, momentFormat)
      });
    }
  }

  render() {
    return (
      <input
        value={this.state.currentMoment.format(momentFormat).toString()}
        onChange={e => {
          const value = e.target.value;
          const nextMoment = moment(value, momentFormat);

          this.setState(
            () => {
              return {
                currentMoment: nextMoment
              };
            },
            () => {
              if (this.props.onChange) {
                this.props.onChange(
                  this.state.currentMoment.format(momentFormat).toString(),
                  this.state.currentMoment
                );
              }
            }
          );
        }}
      />
    );
  }
}
