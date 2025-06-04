$(document).ready(async function () {
  const tg = window.Telegram.WebApp;
  tg.ready();

  // Greeting
  // const user = tg.initDataUnsafe.user;
  // $('#greeting').text(`Hello, ${user.first_name}!`);

  // // Burger toggle and dropdown
  // $('#burger-menu').on('click', function () {
  //   $(this).toggleClass('is-active');
  //   $('#dropdown-menu').slideToggle(200);
  // });

  $('#burger-menu').on('click', function () {
    const $btn = $(this);
    const $menu = $('#dropdown-menu');

    $menu.slideToggle(200, function () {
    });

    // меняем иконку
    $btn.find('i').toggleClass('fa-bars fa-times');
  });

  // // Menu actions
  // $('#btn-my-votes').click(() => window.location.href = '/my-votes');
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
        console.log(data)
        if (data.data.length) {

          $('#vote-list').empty();
          // data.forEach(vote => $('#vote-list').append(
          //   `<li class="vote-item"><h3>${vote.title}</h3><p>Status: ${vote.status}</p></li>`
          // ));
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



  // function b64ToBuf(b64) {
  //   const bin = atob(b64);
  //   const arr = new Uint8Array(bin.length);
  //   for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  //   return arr.buffer;
  // }
  function loadOptions() {
    $.get('/api/v1/webauthn/register/options').done(async (data) => {
      // console.log(data);

      // publicKey.challenge = b64ToBuf(publicKey.challenge);
      // publicKey.user.id = b64ToBuf(publicKey.user.id);
      // data.excludeCredentials = publicKey.excludeCredentials.map(c => ({
      // //   ...c,
      // //   id: b64ToBuf(c.id),
      // }));


      // console.log(data.data)
      // const result = await navigator.credentials.create({ publicKey: data.data });
      // console.log(result);
      localStorage.setItem('userPublicKey', data.data.publicKey);
    })
      .then( /* отправка результата на /register/verify */)
      .catch(err => console.log(err));
  }

  const publicKey = localStorage.getItem('userPublicKey');

  if (!publicKey) {
    loadOptions();
  }

  loadRecentVotes(publicKey);


  // $('#btn-first-vote').click(() => window.location.href = '/create-vote');
  // loadRecentVotes();
});