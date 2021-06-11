exports.getOverview = (req, res) => {
  // 1) Get tour data from collection

  // 2) Build template
  // Render that ttemplate using tour data
  res.status(200).render('base', {
    title: 'All tours',
  });
};

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
};
