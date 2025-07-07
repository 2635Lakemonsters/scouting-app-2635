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
    id: 'autoPoints',
    label: 'Autonomous Points:',
    type: 'textInput',
    keyboardType: 'numeric',
    placeholder: 'e.g., 10',
    section: 'Autonomous Data',
  },
  {
    id: 'autoCanScoreAlgae',
    label: 'Can Score Algae in Auto:',
    type: 'switch',
    section: 'Autonomous Data',
  },
  {
    id: 'autoCanScoreCorrals',
    label: 'Can Score in Corrals in Auto:',
    type: 'switch',
    section: 'Autonomous Data',
  },

  // Teleop
  {
    id: 'teleopPoints',
    label: 'Teleop Points:',
    type: 'textInput',
    keyboardType: 'numeric',
    placeholder: 'e.g., 30',
    section: 'Teleop Data',
  },
  {
    id: 'canScoreCorralsL1',
    label: 'Can Score Corrals L1:',
    type: 'switch',
    section: 'Teleop Data',
  },
  {
    id: 'canScoreCorralsL2',
    label: 'Can Score Corrals L2:',
    type: 'switch',
    section: 'Teleop Data',
  },
  {
    id: 'canScoreCorralsL3',
    label: 'Can Score Corrals L3:',
    type: 'switch',
    section: 'Teleop Data',
  },
  {
    id: 'canScoreCorralsL4',
    label: 'Can Score Corrals L4:',
    type: 'switch',
    section: 'Teleop Data',
  },
  {
    id: 'canScoreAlgae',
    label: 'Can Score Algae:',
    type: 'switch',
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
    id: 'endgamePoints',
    label: 'Endgame Points:',
    type: 'textInput',
    keyboardType: 'numeric',
    placeholder: 'e.g., 20',
    section: 'Endgame',
  },
  {
    id: 'parkedInEndgame',
    label: 'Parked in Endgame:',
    type: 'switch',
    section: 'Endgame',
  },
  {
    id: 'climbedInEndgame',
    label: 'Climbed in Endgame:',
    type: 'switch',
    section: 'Endgame',
  },
  {
    id: 'coOpAchieved',
    label: 'Co-op Objective Achieved:',
    type: 'switch',
    section: 'Endgame',
  },

  // Robot Capabilities
  {
    id: 'canPickupCoralFromFloor',
    label: 'Can Pick Up Corral from Floor:',
    type: 'switch',
    section: 'Robot Capabilities',
  },
  {
    id: 'canPickupCorralFromFeeder',
    label: 'Can Pick Up from Human Player Station:',
    type: 'switch',
    section: 'Robot Capabilities',
  },
  {
    id: 'canPickupAlgaeFromFloor',
    label: 'Can Pick Up Algae from Floor:',
    type: 'switch',
    section: 'Robot Capabilities',
  },
  {
    id: 'canPickupAlgaeFromReef',
    label: 'Can Pick Up Algae from Reef:',
    type: 'switch',
    section: 'Robot Capabilities',
  },
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
