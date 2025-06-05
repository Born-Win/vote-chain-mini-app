$(document).ready(async function () {
  const tg = window.Telegram.WebApp;
  tg.ready();

  $('#burger-menu').on('click', function () {
    const $btn = $(this);
    const $menu = $('#dropdown-menu');

    $menu.slideToggle(200, function () {
    });

    $btn.find('i').toggleClass('fa-bars fa-times');
  });

  $('#btn-create-vote, #btn-first-vote').click(() => window.location.href = '/api/v1/vote-sessions/create');
  $('#btn-participate-vote').click(() => window.location.href = '/api/v1/vote-sessions/participate');
  $('#btn-my-votes').click(() => window.location.href = '/api/v1/vote-sessions/myvotes');

  function loadRecentVotes(publicKey) {
    console.log('publicKey', publicKey)
    $.ajax({
      url: '/api/v1/vote-sessions/all',
      method: 'GET',
      dataType: 'json',
      headers: {
        'publicKey': 'publicKey'
      }
    })
      .done(data => {
        if (data.data.length) {

          $('#vote-list').empty();
          $('#empty-state').hide();
          $('.recent-votes-title').show();

          renderActiveVotes(data.data);
        } else {
          $('#vote-list').empty();
          $('#empty-state').show();
          $('.recent-votes-title').hide();
        }
      })
      .fail(() => { $('#vote-list, #empty-state').toggle(); });
  }

  function renderActiveVotes(votes) {
    const $list = $('#active-vote-list').empty();
    votes.forEach(vote => {
      const lockIcon = vote.status !== 'active'
        ? '<i class="fas fa-lock" title="Locked"></i>'
        : '<i class="fas fa-unlock" title="Unlocked"></i>';
      $list.append(`
            <li class="vote-item">
              <div class="vote-header">
                <h4>${vote.title}</h4>
                ${lockIcon}
              </div>
              <p class="vote-desc">${vote.description}</p>
              <p class="vote-deadline">Deadline: ${vote.ends_at}</p>
              <p class="vote-id">id: ${vote.id}</p>
            </li>
          `);
    });
  }

  function loadOptions() {
    $.get('/api/v1/webauthn/register/options').done(async (data) => {
      localStorage.setItem('userPublicKey', data.data.publicKey);
    })
      .then()
      .catch(err => console.log(err));
  }

  const publicKey = localStorage.getItem('userPublicKey');

  if (!publicKey) {
    loadOptions();
  }

  loadRecentVotes(publicKey);
});