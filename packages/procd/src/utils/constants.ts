/* eslint-disable no-unused-vars */

/* Procd Constants */

enum COMMANDS {
  ACTIVE_INTERFACE = "netstat -rn | grep UG | awk '{print $NF}'",
  INTERFACE_TYPE = 'cat /proc/net/wireless | grep ',
  MAC_ADDR_PRFX = 'cat /sys/class/net/',
  MAC_ADDR_SFFX = '/address',
  GATEWAY_IP_PRFX = "ip r | grep ",
  GATEWAY_IP_SFFX = " | grep default | cut -d ' ' -f 3 | head -n1",
  NETMASK_PRFX = "ifconfig ",
  NETMASK_SFFX = " 2> /dev/null | egrep 'netmask|Mask:' | awk '{print $4}' | sed 's/Mask://'"
}

enum EXPR {
  LOOPBACK_1 = 'lo',
  LOOPBACK_2 = 'lo0',
  IPV4 = 'IPv4',
  WIRED = 'Wired',
  WIRELESS = 'Wireless'
}

export {
  COMMANDS,
  EXPR
};
