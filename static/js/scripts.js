document.addEventListener('DOMContentLoaded', function() {
    const stripePublicKey = '{{ stripe_public_key }}';
    const stripe = Stripe(stripePublicKey);

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return stripe.redirectToCheckout({ sessionId: data.sessionId });
            })
            .then(function (result) {
                if (result.error) {
                    alert(result.error.message);
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
        });
    }
});
