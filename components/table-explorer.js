import React, { useState, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import RandomDivider from './random-divider';
import * as mq from '../constants/media-queries';

const PeopleList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PeopleListItem = styled.li`
  margin: 0;
  width: 100%;
  ${mq.mediumUp} {
    width: 30%;
  }
`;

const TableHeading = styled.h2`
  font-family: Satisfy, cursive;
  color: inherit;
`;

const blink = keyframes`
0% { background-color: black; }
49% { background-color: black; }
50% { background-color: white; }
100% { background-color: white; }
`;

const TableName = styled.span`
  color: hotpink;
  background-color: black;
  animation: 1s ${blink} linear infinite;
  display: inline-block;
  padding: 10px;
`;

const Guest = styled.div`
  margin: 10px;
  border: 3px dotted orange;
  padding: 10px;
`;

const GuestImage = styled.div`
  background: url(${props => props.src}) center center no-repeat;
  background-size: cover;
  height: 50vh;
  max-height: 300px;
  width: 100%;
`;

const GuestName = styled.h3``;

const GuestFactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const GuestFactListItem = styled.li`
  margin: 0;
`;

const GuestSelectorLabel = styled.label`
  display: block;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 1em;
`;

const GuestSelector = styled.select`
  appearance: none;
  background: none;
  padding: 10px;
  border: 1px solid currentColor;
`;

const Tables = styled.ul`
  border: 1px dashed #333;
  display: flex;
  align-items: space-between;
  justify-content: center;
  margin: 0 auto;
  padding: 10px;
  list-style: none;
  flex-wrap: wrap;
  max-width: 600px;
`;

const bounce = keyframes`
 0% {
   transform: scale(1)
 }
 20%, 80% {
   transform: scale(1.1);
 }
 40%, 60% {
  transform: scale(0.8);
}
50% {
  transform: scale(1);
}
`;

const Table = styled.li`
  background-color: ${props => (props.isSelected ? 'white' : 'none')};
  ${props =>
    props.isSelected &&
    css`
      animation: ${bounce} 1s ease-out both infinite;
    `}
  border: 3px solid black;
  border-radius: 50%;
  flex: 0 0 25%;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  margin: 10px;
  height: 100%;
  white-space: no-wrap;

  ${mq.mediumUp} {
    font-size: 30px;
  }

  &:first-of-type {
    border-radius: 0;
    height: 40px;
    flex: 1 0 100%;
  }

  &::before {
    content: '';
    padding-top: 100%;
    float: left;
  }
`;

const tableOrder = [
  'Hovedbordet',
  'Church',
  'Mimosa',
  'The Mission',
  'Pjoltergeist',
  'Borrito',
  'Fly Fisher',
  'Kontoret',
  'Burger',
  'Slaggathor',
];

function TableExplorer(props) {
  const { guests } = props;
  const [selectedGuestId, setSelectedGuestId] = useState('');

  const handleSelectedGuestChange = e => {
    setSelectedGuestId(e.target.value);
  };

  const selectedGuest = useMemo(
    () => guests.find(guest => guest.id === selectedGuestId),
    [selectedGuestId, guests],
  );

  const otherPeopleAtTable = useMemo(() => {
    if (!selectedGuest) {
      return [];
    }
    return guests.filter(guest => guest.table === selectedGuest.table);
  }, [selectedGuest, guests]);

  return (
    <div>
      <GuestSelectorLabel htmlFor="guest-selector">
        Hva heter du?
      </GuestSelectorLabel>
      <GuestSelector
        id="guest-selector"
        onChange={handleSelectedGuestChange}
        value={selectedGuestId}
      >
        <option value="">Velg navnet ditt fra listen ⬇️</option>
        {guests.map(guest => (
          <option key={guest.id} value={guest.id}>
            {guest.name}
          </option>
        ))}
      </GuestSelector>
      {selectedGuest && (
        <div>
          <TableHeading>
            Du sitter på bordet{' '}
            <TableName>🎉 {selectedGuest.table} 🎉</TableName>
          </TableHeading>
          <Tables>
            {tableOrder.map((tableName, index) => (
              <Table
                key={tableName}
                isSelected={tableName === selectedGuest.table}
              >
                {tableName}
              </Table>
            ))}
          </Tables>
          <p>De som sitter på bordet er</p>
          <PeopleList>
            {otherPeopleAtTable.map(other => (
              <PeopleListItem key={other.id}>
                <Guest>
                  <GuestImage src={other.imageSrc} />
                  <GuestName>{other.name}</GuestName>
                  <GuestFactList>
                    {other.facts.map((fact, index) => (
                      <GuestFactListItem key={fact + index}>
                        {fact}
                      </GuestFactListItem>
                    ))}
                  </GuestFactList>
                </Guest>
                <RandomDivider />
              </PeopleListItem>
            ))}
          </PeopleList>
        </div>
      )}
    </div>
  );
}

export default TableExplorer;
