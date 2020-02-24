window.onload = function() {
  new Rolldate({
    el: '#start',
    format: 'DD-MM-YYYY',
    beginYear: 2018,
    endYear: 2100,
    lang: {
	      title: 'Select A Date',
	      cancel: 'Cancel',
	      confirm: 'Confirm',
	      year: '',
	      month: '',
	      day: '',
	      hour: '',
	      min: '',
	      sec: '',
	    },
  })

  new Rolldate({
    el: '#end',
    format: 'DD-MM-YYYY',
    beginYear: 2018,
    endYear: 2100,
    lang: {
        title: 'Select A Date',
        cancel: 'Cancel',
        confirm: 'Confirm',
        year: '',
        month: '',
        day: '',
        hour: '',
        min: '',
        sec: '',
      },
  })
}
