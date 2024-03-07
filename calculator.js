const binaryToDecimal = binaryIp => {
    const octets = binaryIp.match(/.{1,8}/g)
    const decimalIp = octets.map(octet =>
        parseInt(octet, 2)).join('.')
    return decimalIp
}



const decimalToBinary = decimalIp => {
    const octets = decimalIp.split('.')
    const binaryOctets = octets.map(octet => {
        const binary = parseInt(octet, 10).toString(2)
        return binary.padStart(8, '0')
    })
    const binaryIp = binaryOctets.join('')
    return binaryIp
}

const subnetMaskToBinary = (subnetMask) => {
    if (subnetMask > 32) {
        return "Jepni nje numer me te vogel se 32"
    } else {
        const count1 = Math.min(32, Math.max(0, Math.floor(Number(subnetMask))))
        console.log("count 1 : ", count1)
        const binary = '1'.repeat(count1).padEnd(32, '0')
        return binary
    }
}



const findNetworkID = (ip, number) => {
    const networkId = ip.slice(0, -number).padEnd(32, '0')
    return networkId
}

const findBroadcastID = (ip, number) => {
    const broadcastID = ip.slice(0, -number).padEnd(32, '1')
    return broadcastID
}

const isValidIp = (ip) => {
    var ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

const requiredBits = (nrOfSubnets) => {
    let isDone = false
    let count = -1
    while (!isDone) {
        count++
        if (nrOfSubnets <= Math.pow(2, count)) {
            isDone = true
        }
    }
    return count

}





const getIpAddressInfo = (ip, subnetMask) => {

    if (!isValidIp(ip)) {
        console.log("Not correct IP address")
    }
    else {


        const convertedToBinary = decimalToBinary(ip)
        const numbertoadd = 32 - subnetMask
        const numberOfOnes = subnetMask
        const networkIdBinary = findNetworkID(convertedToBinary, numbertoadd)
        const networkIdDecimal = binaryToDecimal(networkIdBinary)
        console.log(`NETWORK ID IN DECIMAL: ${networkIdDecimal}/${subnetMask}`)

        const broadcastBinary = findBroadcastID(convertedToBinary, numbertoadd)
        const broadcastDecimal = binaryToDecimal(broadcastBinary)
        console.log(`Broadcast id in decimal:  ${broadcastDecimal}/${subnetMask}`)


        const nrHosts = Math.pow(2, 32 - subnetMask)
        console.log("Number of hosts: ", nrHosts)

        const activeHosts = nrHosts -2
        console.log("Active hosts: ", activeHosts)

        const firstHostBinary = networkIdBinary.slice(0, -1) + '1';

        const firstHostDecimal = binaryToDecimal(firstHostBinary);

        console.log(`First Host:  ${firstHostDecimal}/${subnetMask}`);


        const lastHostBinary = broadcastBinary.slice(0, -1) + '0';
        const lastHostDecimal = binaryToDecimal(lastHostBinary);
        console.log(`Last Host:  ${lastHostDecimal}/${subnetMask}`);
    }
}
// getIpAddressInfo('192.168.100.0', 24)




const nextIp = (ip, increment) => {
    const ipParts = ip.split('.').map(Number);
    ipParts[3] += increment;
    return ipParts.join('.');
};

const generateSubnetsFromNetwork = (ip, subnetMask, nrSubnets) => {
    if (!isValidIp(ip)) {
        console.log("Not correct IP address")
    }
    else {
        reqBits = requiredBits(nrSubnets)
        const newSubnetMask = reqBits + subnetMask

        const nrHosts = Math.pow(2, 32 - newSubnetMask)
        const activeHosts = nrHosts - 2
        let subnets = []
        let current = ip;
        for (let i = 0; i < nrSubnets; i++) {
            console.log(`subneti ${i+1}`)
            console.log("------------------------------------------")
            const network = current;
            getIpAddressInfo(current, newSubnetMask)
            console.log("------------------------------------------")
            const lastIp = nextIp(network, activeHosts + 1);
            current = nextIp(lastIp, 1);

        }
    }
}

// generateSubnetsFromNetwork('204.15.5.0', 24, 5)


const compareIPs = (ip1, ip2, subnetMask) => {
    const firstIP = decimalToBinary(ip1).slice(0, subnetMask)
    const secondIP = decimalToBinary(ip2).slice(0, subnetMask)
    return firstIP === secondIP
}



// const trueOrFalse = compareIPs('172.16.17.30', '172.16.28.15', 20)
// console.log(trueOrFalse)