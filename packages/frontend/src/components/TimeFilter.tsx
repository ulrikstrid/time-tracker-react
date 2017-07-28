import * as React from "react";
import { DatePicker, DayOfWeek } from "office-ui-fabric-react/lib/DatePicker";
import styled from "styled-components";

import { TimeEntryFilter } from "../state/reducers/entries";
import { dayPickerStrings } from "../config";

interface Props {
  filter: TimeEntryFilter;
  setFilterStart: (start: Date | string | null | undefined) => void;
  setFilterEnd: (end: Date | string | null | undefined) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  border 1px solid #444444;
  padding: 10px;
  margin-bottom: 10px;
`;

const P = styled.p`
  flex: none;
  width: 100%;
`;

const PickerWrapper = styled.div`
  flex: 1 1 calc(50% - 25px);
  margin: 5px;
`;

export default class TimeFilter extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Wrapper>
        <P>Filter</P>
        <PickerWrapper>
          <DatePicker
            firstDayOfWeek={DayOfWeek.Monday}
            strings={dayPickerStrings}
            placeholder="Välj ett startdatum"
            value={this.props.filter.start.toDate()}
            onSelectDate={date => this.props.setFilterStart(date)}
            label="Start"
          />
        </PickerWrapper>
        <PickerWrapper>
          <DatePicker
            firstDayOfWeek={DayOfWeek.Monday}
            strings={dayPickerStrings}
            placeholder="Välj ett slutdatum"
            value={this.props.filter.end.toDate()}
            onSelectDate={date => this.props.setFilterEnd(date)}
            label="Slut"
          />
        </PickerWrapper>
      </Wrapper>
    );
  }
}
