const $form = document.querySelector('#form')
const $input = document.querySelector('#input')
const $subtmit = document.querySelector('#submit')
const $results = document.querySelector('#results')

const regex = /^(25[0 - 5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

const isValid = (reg) => {
    if ((regex).test(reg)) {
        return reg
    } else {
        alert("You have entered an invalid IP address!")
        return undefined
    }
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3668d6e643msh469ed4eab73488ap111602jsn6c142f677ba1',
        'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
    }
};

const fetchIpInfo = ip => {
    return fetch(`https://ipwho.is/${ip}`, options)
        .then(res => res.json())
        .catch(err => console.error(err))
}


$form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const { value } = $input
    if (!value) return

    $subtmit.setAttribute('disabled', '')
    $subtmit.setAttribute('aria-busy', 'true')

    const ipInfo = await fetchIpInfo(isValid(value))

    if (ipInfo) {
        $results.innerHTML = JSON.stringify(ipInfo, null, 2)
    }

    $subtmit.removeAttribute('disabled')
    $subtmit.removeAttribute('aria-busy')

})



