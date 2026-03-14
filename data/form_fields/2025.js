const formFields = [
  // Team Info
  {
    id: 'teamNumber',
    label: 'Team Number:',
    type: 'textInput',
    keyboardType: 'numeric',
    placeholder: 'e.g., 2635',
    section: 'Team Information',
  },
  {
    id: 'matchNumber',
    label: 'Match Number:',
    type: 'textInput',
    keyboardType: 'numeric',
    placeholder: 'e.g., 15',
    section: 'Team Information',
  },

  // Autonomous
  {
    id: 'autoFuelScored',
    label: 'Autonomous Fuel(Balls) Scored:',
    type: 'counter',
    keyboardType: 'numeric',
    placeholder: 'e.g., 10',
    section: 'Autonomous Data',
  },
  {
    id: 'autoCanClimb',
    label: 'Was the robot able to climb during auto?',
    type: 'switch',
    section: 'Autonomous Data',
  },
  // Teleop
  {
    id: 'teleopFuelScored',
    label: 'Teleop Fuel Scored:',
    type: 'textInput',
    keyboardType: 'numeric',
    placeholder: 'e.g., 30',
    section: 'Teleop Data',
  },
  {
    id: 'defenseAbility',
    label: 'Effective at Defense:',
    type: 'switch',
    section: 'Teleop Data',
  },

  // Endgame
  {
    id: 'endgameClimb',
    label: 'Endgame Climb:',
    type: 'textInput',
    keyboardType: 'numeric',
    placeholder: 'e.g., 0-3',
    section: 'Endgame',
  },
  // Robot Capabilities
  {
    id: 'mobilitySpeed',
    label: 'Mobility Rating (1-5):',
    type: 'textInput',
    keyboardType: 'numeric',
    placeholder: 'e.g., 4',
    section: 'Robot Capabilities',
  },
  {
    id: 'reliabilityRating',
    label: 'Reliability Rating (1-5):',
    type: 'textInput',
    keyboardType: 'numeric',
    placeholder: 'e.g., 5',
    section: 'Robot Capabilities',
  },

  // Notes
  {
    id: 'scoutNotes',
    label: 'Additional Notes:',
    type: 'textInput',
    keyboardType: 'default',
    placeholder: 'e.g., any notes',
    section: 'Scout Notes',
  },
];

export default formFields;
