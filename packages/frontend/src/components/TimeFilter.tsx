import * as React from "react";
import { DateTimePicker } from "react-widgets";
import styled from "styled-components";

import { TimeEntryFilter } from "../state/reducers/entries";

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
  padding: 10px;
  margin-bottom: 10px;
`;

const Header = styled.h2`
  flex: none;
  width: 100%;
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
        <Header>Filter</Header>
        <PickerWrapper>
          <P>Start</P>
          <DateTimePicker
            calendar={true}
            time={false}
            defaultValue={this.props.filter.start.toDate()}
            onChange={date => this.props.setFilterStart(date)}
          />
        </PickerWrapper>
        <PickerWrapper>
          <P>End</P>
          <DateTimePicker
            calendar={true}
            time={false}
            defaultValue={this.props.filter.end.toDate()}
            onChange={date => this.props.setFilterEnd(date)}
          />
        </PickerWrapper>
      </Wrapper>
    );
  }
}
