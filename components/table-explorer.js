import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
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

const TableExplorer = props => {
  const { guests } = props;
  const [name, setName] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const selectedGuest = useMemo(
    () => guests.find(guest => guest.name === name),
    [name, guests],
  );

  const otherPeopleAtTable = useMemo(() => {
    if (!selectedGuest) {
      return [];
    }
    return guests.filter(
      guest => guest.table === selectedGuest.table && guest !== selectedGuest,
    );
  }, [selectedGuest, guests]);

  return (
    <div>
      <div>Hva heter du?</div>
      <select onChange={handleNameChange} value={name}>
        <option value="">Velg navnet ditt fra listen</option>
        {props.guests.map(guest => (
          <option key={guest.name} value={guest.name}>
            {guest.name}
          </option>
        ))}
      </select>
      {selectedGuest && (
        <div>
          <h2>Du sitter på bord {selectedGuest.table}!</h2>
          <p>De andre på bordet ditt er:</p>
          <PeopleList>
            {otherPeopleAtTable.map(other => (
              <PeopleListItem key={other.name}>
                <Guest>
                  <GuestImage src={other.imageSrc} />
                  <GuestName>{other.name}</GuestName>
                  <GuestFactList>
                    {other.facts.map(fact => (
                      <GuestFactListItem key={fact}>{fact}</GuestFactListItem>
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
};

export default TableExplorer;
