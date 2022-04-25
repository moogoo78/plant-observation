const ObservationChoices = [{
  title: '葉子',
  key: 'leaf',
  helperText: '紀錄代號之外，也可以紀錄遮蔭比率。',
  choices: [{
    name: '0',
    label: '空枝'
  }, {
    name: '1',
    label:'嫩芽'
  }, {
    name: '2',
    label: '新嫩葉'
  },{
    name: '3',
    label: '老葉'
  }, {
    name: '4',
    label: '落葉'
  }
]}, {
  title: '花',
  key: 'flower',
  choices: [{
    name: '0',
    label: '花芽'
  }, {
    name: '1',
    label: '澎大'
  }, {
    name: '2',
    label: '開花'
  }, {
    name: '3',
    label: '盛開'
  }, {
    name: '4',
    label: '終花'
}]}, {
  title: '果',
  key: 'fruit',
  choices: [{
    name: '0',
    label: '增大'
  }, {
    name: '1',
    label: '始熟'
  }, {
    name: '2',
    label: '正熟'
  }, {
    name: '3',
    label: '過熟'
  }, {
    name: '4',
    label: '掉落'
  }]
}];

const getObservationChoicesText = (data) => {
  const result = [];
  for (const i in ObservationChoices) {
    const item = ObservationChoices[i];
    if (data[item.key].length >=0) {
      const labels = data[item.key].map((value) => {
        const choice = ObservationChoices[i].choices.find((x) => x.name === value);
        return choice.label;
      });
      if (labels.length > 0) {
        result.push(`${item.title}: ${labels.join(',')}`);
      }
    }
  }
  return result.join(' | ');
}
export { ObservationChoices, getObservationChoicesText }
