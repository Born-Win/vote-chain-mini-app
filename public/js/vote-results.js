$(document).ready(function () {
    $('#home-btn').click(() => window.location.href = '/');

    const sessionId = localStorage.getItem('sessionId');

    function loadVoteResults() {
        $.ajax({
            url: `/api/v1/vote-sessions?id=${sessionId}`,
            method: 'GET',
            dataType: 'json',
        })
            .done(data => {
                console.log(data.data)
                renderVote(data.data);
            })
            .fail(() => { alert('Error occured') });
    }

    function formatToCustom(isoString) {
        const date = new Date(isoString);
      
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const m = months[date.getMonth()];
      
        const d = String(date.getDate()).padStart(2, '0');
      
        const y = date.getFullYear();
      
        let h = date.getHours();
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        const min = String(date.getMinutes()).padStart(2, '0');
      
        return `${m} ${d} ${y} ${h}:${min} ${ampm}`;
      }

      function makeChart(options) {
          const maxCount = Math.max(...options.map(d=>d.vote_count));
          
          const container = document.getElementById('horizontal-chart');
          
          $(container).html('');

          options.forEach(item => {
            const pct = maxCount === 0
              ? 0
              : Math.round((item.vote_count / maxCount) * 100);
          
            const bar = document.createElement('div');
            bar.className = 'h-bar';
          
            const info = document.createElement('div');
            info.className = 'h-bar-info';
            info.innerHTML = `
              <span>${item.label}</span>
              <span>${item.vote_count}</span>
            `;
          
            const track = document.createElement('div');
            track.className = 'h-bar-track';
          
            const fill = document.createElement('div');
            fill.className = 'h-bar-fill';
            fill.style.width = pct + '%';
          
            bar.appendChild(track);
            track.appendChild(fill);
            bar.appendChild(info);
          
            container.appendChild(bar);
        });
      }

    function renderVote(data) {
        $('#vote-title').text(data.session.title);
        $('#vote-desc').text(data.session.description);
        $('#vote-deadline').text(`Deadline: ${formatToCustom(data.session.ends_at)}`);
        makeChart(data.options);
    }

    loadVoteResults();
});
