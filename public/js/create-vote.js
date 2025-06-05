$(document).ready(function() {
  $('#home-btn').click(() => window.location.href = '/');

  $('#add-option').on('click', function() {
    const optionAmount = $('#options-wrapper').children().length;
    const $group = $(
      `<div class="form-group option-group">
          <input type="text" name="options[]" placeholder='Option ${optionAmount+1}' required />
        </div>`
    );
    $('#options-wrapper').append($group);
  });

  $('.submit-btn').on('click', (e) => {
    e.preventDefault();

    const topic = $('#vote-topic').val();

    if (!topic) {
      return alert('Need to fullfill topic field');
    }

    const description = $('#vote-description').val();

    if (!description) {
      return alert('Need to fullfill description field');
    }

    const options = [];
    let notfullfiled = false;

    $('.option-group').find('input').each(function() {
      const option = $(this).val();
      console.log(option);
      if (!option) {
        notfullfiled = true;
        return;
      }
      options.push(option);
    });

    if (notfullfiled || options.length < $('.option-group').find('input').length) {
      return alert('Need to name option');
    }

    const deadline = $('#vote-deadline').val();

    if (!deadline) return alert('Need to specify deadline');

    const payload = {
      title: topic,
      description,
      ends_at: deadline,
      options
    }

    return $.ajax({
      url: `/api/v1/vote-sessions`,
      method: 'POST',
      dataType: 'json',
      headers: {
        'publicKey': 'publicKey'
      },
      data: payload,
    })
    .done(data => {
      $('#vote-topic').val('');
      $('#vote-description').val('');
      $('#vote-deadline').val('');
      $('.form-group.option-group').slice(1).remove();
      $('.form-group.option-group').find('input').val('');
      alert(`Your voting was created. It's id ${data.data.id}`);
    })
    .fail(() => { });
   });
});
