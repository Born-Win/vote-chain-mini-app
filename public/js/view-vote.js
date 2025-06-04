$(document).ready(function () {
    $('#home-btn').click(() => window.location.href = '/');

    function loadRecentVotes(publicKey) {
        $.ajax({
            url: '/api/v1/vote-sessions/my',
            method: 'GET',
            dataType: 'json',
            headers: {
                'publicKey': 'publicKey'
            }
        })
            .done(data => {
                console.log(data);
                renderActiveVotes(data.data.created, $('#created-vote-list'));
                renderActiveVotes(data.data.participated, $('#participating-vote-list'));
            })
            .fail(() => { $('#vote-list, #empty-state').toggle(); });
    }

    function renderActiveVotes(votes, $list) {
        $list.empty();

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
                ${vote.tx_hash ?
                    `<button class="tx-view-btn" title="View on Blockscout">
                  <i class="fas fa-search"></i>
                </button>` : ''
                }
              </li>
            `);
        });
    }

    function loadTransaction() {
        $('#participating-vote-list').on('click', '.tx-view-btn', function () {
            const txHash = '0x49eca414c6b71afbd7ceccd53d731b850c23f2bf726acbbc7fde2e6b13a202f8';

            if (!txHash) {
                alert('No transaction hash available for this vote.');
                return;
            }

            const url = `https://blockscout.com/eth/mainnet/tx/${txHash}`;
            window.open(url, '_blank');

            $.ajax({
                url: `https://eth.blockscout.com/api/v2/transactions/${txHash}`,
                method: 'GET',
                dataType: 'json',
            })
                .done(data => {
                    console.log(data);

                    $('#tx-hash').text(data.hash);
                    $('#tx-status').text(data.result);
                    $('#tx-block').text(data.block_number);
                    $('#tx-timestamp').text(data.timestamp);
                    $('#tx-from').text(data.from.hash);
                    $('#tx-to').text(data.to.hash);

                    const txFeeUsd = (Number(data.transaction_burnt_fee) * Number(data.historic_exchange_rate)).toFixed(6);
                    const txGasPriceUsd = (Number(data.gas_price) * Number(data.historic_exchange_rate)).toFixed(6);
                    $('#tx-fee').text(`0.000${Number(data.transaction_burnt_fee).toFixed(5)} ETH ${txFeeUsd} USD`);
                    $('#tx-gas-price').text(`0.0000000${Number(data.gas_price).toFixed(5)} ETH ${txGasPriceUsd} USD`);
                    
                    $('.modal-overlay').show()
                })
                .fail(() => { alert('Transaction not found') });
        });

        $('#tx-modal-close').on('click', () => {
            $('#tx-modal').hide();
        })
    }


    loadTransaction();
    loadRecentVotes();
});
