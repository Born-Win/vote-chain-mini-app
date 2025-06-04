// script-create.js
$(document).ready(function () {
  $('#home-btn').click(() => window.location.href = '/');

  function loadVote(id) {
    return $.ajax({
      url: `/api/v1/vote-sessions?id=${id}`,
      method: 'GET',
      dataType: 'json',
      headers: {
        'publicKey': 'publicKey'
      },
    });
  }

  $('#find-vote-btn').on('click', function () {
    const id = $('#vote-url-input').val().trim();
    if (!id) return;
    loadVote(id)
      .done(data => {
        console.log(data);

        $('.find-vote').hide();
        $('.form-container').show();

        $('.vote-topic').text(data.data.session.title);
        $('.vote-description').attr('data-id', data.data.session.id).text(data.data.session.description);

        $('#vote-form').find('.options-wrapper').html(`
                  ${data.data.options.map(option => `
                    <label class="option-group">
                    <input type="radio" data-id="${option.id}" name="option" value="${option.label}" required />
                    <span class="custom-radio"></span>
                    <span class="option-text">${option.label}</span>
                    </label>
                `).join('')}
            `);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        if (errorThrown === 'Not Found') {
          alert('Vote not found');
        } else {
          alert('Vote already is not available');
        }
      });
  });

  $('.vote-btn').on('click', function (e) {
    e.preventDefault();
    const sessionId = $('.vote-description').attr('data-id');
    const optionId = $('input[name="option"]:checked').attr('data-id');

    if (!optionId) {
      return alert('No option chosen');
    }

    const payload = {
      session_id: sessionId,
      option_id: optionId
    };

    $.ajax({
      url: `/api/v1/vote-records`,
      method: 'POST',
      dataType: 'json',
      headers: {
        'publicKey': 'publicKey'
      },
      data: payload,
    })
    .done(data => {
      console.log(data)
      alert('Thanks for voting');
      $('.find-vote').show();
      $('.form-container').hide();
  
      $('#vote-url-input').val('');
    })
    .fail(() => { });
  });
});