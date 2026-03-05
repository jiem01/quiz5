const HARDWARE_KEYWORDS = [
  'cpu', 'processor', 'gpu', 'graphics card', 'video card',
  'ram', 'memory', 'ddr', 'motherboard', 'mobo',
  'power supply', 'psu', 'ssd', 'hdd', 'hard drive',
  'storage', 'nvme', 'sata', 'case', 'chassis',
  'cooling', 'cooler', 'fan', 'heatsink', 'thermal paste',
  'monitor', 'display', 'resolution', 'refresh rate',
  'keyboard', 'mouse', 'peripheral', 'usb', 'hdmi',
  'displayport', 'pcie', 'pci', 'socket', 'chipset',
  'bios', 'uefi', 'boot', 'post', 'beep code',
  'overclock', 'undervolt', 'benchmark', 'fps',
  'watt', 'voltage', 'ampere', 'temperature', 'throttle',
  'compatible', 'compatibility', 'bottleneck', 'upgrade',
  'build', 'pc build', 'gaming pc', 'workstation',
  'amd', 'intel', 'nvidia', 'radeon', 'geforce', 'ryzen',
  'core i', 'xeon', 'threadripper', 'rtx', 'gtx',
  'atx', 'micro atx', 'mini itx', 'form factor',
  'm.2', 'dimm', 'sodimm', 'ecc', 'vram',
  'hardware', 'component', 'specs', 'specification',
  'driver', 'firmware', 'cable', 'connector', 'adapter',
  'surge protector', 'ups', 'uninterruptible',
  'troubleshoot', 'diagnose', 'repair', 'replace',
  'no display', 'black screen', 'blue screen', 'crash',
  'freeze', 'overheat', 'noise', 'loud', 'smoke',
  'capacitor', 'resistor', 'vrm', 'mosfet',
  'water cooling', 'aio', 'liquid cooling', 'air cooling',
  'rgb', 'led', 'argb',
  'budget', 'price', 'cost', 'cheap', 'expensive', 'worth',
  'recommend', 'suggestion', 'best', 'top', 'tier',
];

const RESTRICTION_MESSAGE =
  'I can only assist with PC hardware topics such as compatibility, component recommendations, and hardware troubleshooting.';

const isHardwareRelated = (prompt) => {
  const lower = prompt.toLowerCase();
  return HARDWARE_KEYWORDS.some((keyword) => lower.includes(keyword));
};

const generateCompatibilityResponse = (lower) => {
  if (
    (lower.includes('cpu') || lower.includes('processor')) &&
    (lower.includes('motherboard') || lower.includes('mobo'))
  ) {
    return (
      'To check CPU and motherboard compatibility, you need to match the CPU socket type ' +
      'with the motherboard socket. For example:\n\n' +
      '- AMD Ryzen 5000/7000 series uses AM4/AM5 sockets\n' +
      '- Intel 12th/13th/14th Gen uses LGA 1700 socket\n' +
      '- Intel 10th/11th Gen uses LGA 1200 socket\n\n' +
      'Also verify that the motherboard chipset supports your specific CPU model. ' +
      'Check the motherboard manufacturer\'s CPU support list for confirmed compatibility. ' +
      'A BIOS update may be required for newer CPUs on older boards.'
    );
  }
  if (
    (lower.includes('cpu') || lower.includes('processor')) &&
    (lower.includes('ram') || lower.includes('memory'))
  ) {
    return (
      'CPU and RAM compatibility depends on what the CPU\'s memory controller supports:\n\n' +
      '- AMD Ryzen 7000 series: DDR5 only\n' +
      '- AMD Ryzen 5000 series: DDR4 only\n' +
      '- Intel 12th/13th/14th Gen: DDR4 or DDR5 (depends on motherboard)\n\n' +
      'Check the maximum supported memory speed and capacity in your CPU specifications. ' +
      'For optimal performance, match RAM speed with the CPU\'s sweet spot ' +
      '(e.g., DDR4-3600 for Ryzen 5000).'
    );
  }
  if (lower.includes('ram') || lower.includes('memory')) {
    return (
      'For RAM compatibility, check these factors:\n\n' +
      '1. DDR generation (DDR4 vs DDR5) - must match motherboard slots\n' +
      '2. Maximum speed supported by CPU and motherboard\n' +
      '3. Maximum capacity per slot and total slots\n' +
      '4. DIMM vs SO-DIMM (desktop vs laptop)\n\n' +
      'For best performance, use matched pairs in dual-channel configuration. ' +
      'Check your motherboard\'s QVL (Qualified Vendor List) for tested RAM kits.'
    );
  }
  if (lower.includes('gpu') || lower.includes('graphics')) {
    return (
      'For GPU compatibility, verify:\n\n' +
      '1. PCIe slot availability (x16 slot required for modern GPUs)\n' +
      '2. Physical space in your case (check GPU length and width)\n' +
      '3. Power supply wattage and required PCIe power connectors\n' +
      '4. CPU bottleneck potential - pair appropriately\n\n' +
      'Most modern GPUs use PCIe 4.0 x16 but are backward compatible with PCIe 3.0.'
    );
  }
  if (lower.includes('psu') || lower.includes('power supply')) {
    return (
      'For PSU compatibility:\n\n' +
      '1. Calculate total system power draw (CPU TDP + GPU TDP + other components)\n' +
      '2. Add 20-30% headroom above total draw\n' +
      '3. Check required connectors: 24-pin ATX, 8-pin CPU, PCIe power cables\n' +
      '4. Verify form factor (ATX, SFX, SFX-L) fits your case\n\n' +
      'Use an online PSU calculator for accurate wattage estimates.'
    );
  }
  return (
    'To check hardware compatibility, I recommend:\n\n' +
    '1. Use PCPartPicker.com to verify component compatibility\n' +
    '2. Check manufacturer specification sheets\n' +
    '3. Verify socket types, form factors, and power requirements\n' +
    '4. Consult the motherboard\'s QVL for RAM and storage compatibility\n\n' +
    'Could you specify which components you want to check compatibility for?'
  );
};

const generateRecommendationResponse = (lower) => {
  if (lower.includes('budget') || lower.includes('cheap') || lower.includes('price') || lower.includes('cost')) {
    return (
      'Here are some budget-tier PC build recommendations:\n\n' +
      'Entry Level (~\u20B129,000):\n' +
      '- CPU: AMD Ryzen 5 5600 or Intel i3-12100F\n' +
      '- GPU: RX 6600 or RTX 3060\n' +
      '- RAM: 16GB DDR4-3200\n' +
      '- Storage: 500GB NVMe SSD\n' +
      '- PSU: 550W 80+ Bronze\n\n' +
      'Mid Range (~\u20B158,000):\n' +
      '- CPU: AMD Ryzen 5 7600X or Intel i5-13400F\n' +
      '- GPU: RTX 4060 Ti or RX 7700 XT\n' +
      '- RAM: 32GB DDR5-5600\n' +
      '- Storage: 1TB NVMe SSD\n' +
      '- PSU: 650W 80+ Gold\n\n' +
      'Could you share your specific budget and use case for a more tailored recommendation?'
    );
  }
  if (lower.includes('gpu') || lower.includes('graphics')) {
    return (
      'GPU recommendations by tier:\n\n' +
      'Budget: AMD RX 6600 / NVIDIA RTX 3060 (~\u20B111,600-14,500)\n' +
      'Mid-range: AMD RX 7700 XT / NVIDIA RTX 4060 Ti (~\u20B120,300-26,100)\n' +
      'High-end: AMD RX 7900 XTX / NVIDIA RTX 4070 Ti Super (~\u20B131,900-46,400)\n' +
      'Enthusiast: NVIDIA RTX 4080 Super / RTX 4090 (~\u20B158,000-92,800)\n\n' +
      'Consider your target resolution and refresh rate:\n' +
      '- 1080p: Budget to Mid-range\n' +
      '- 1440p: Mid-range to High-end\n' +
      '- 4K: High-end to Enthusiast'
    );
  }
  if (lower.includes('cpu') || lower.includes('processor')) {
    return (
      'CPU recommendations:\n\n' +
      'Gaming focused:\n' +
      '- Budget: AMD Ryzen 5 5600 / Intel i3-12100F\n' +
      '- Mid-range: AMD Ryzen 5 7600X / Intel i5-13600K\n' +
      '- High-end: AMD Ryzen 7 7800X3D / Intel i7-14700K\n\n' +
      'Productivity/Workstation:\n' +
      '- Mid-range: AMD Ryzen 7 7700X / Intel i7-13700K\n' +
      '- High-end: AMD Ryzen 9 7950X / Intel i9-14900K\n\n' +
      'The Ryzen 7 7800X3D is currently the best pure gaming CPU ' +
      'thanks to its 3D V-Cache technology.'
    );
  }
  return (
    'I\'d be happy to recommend PC components. To give you the best advice, ' +
    'please share:\n\n' +
    '1. Your total budget\n' +
    '2. Primary use case (gaming, content creation, office work)\n' +
    '3. Any specific requirements (resolution, software needs)\n' +
    '4. Components you already have (if upgrading)\n\n' +
    'This will help me tailor recommendations to your specific needs.'
  );
};

const generateTroubleshootingResponse = (lower) => {
  if (lower.includes('boot') || lower.includes('post') || lower.includes('no display') || lower.includes('black screen')) {
    return (
      'Here are steps to troubleshoot boot/display issues:\n\n' +
      '1. Check all power connections (24-pin ATX, 8-pin CPU, GPU power)\n' +
      '2. Verify RAM is fully seated - try one stick at a time\n' +
      '3. Check if the monitor is connected to the GPU (not motherboard)\n' +
      '4. Listen for beep codes or check debug LEDs on the motherboard\n' +
      '5. Clear CMOS by removing the battery for 30 seconds\n' +
      '6. Try booting with minimal hardware (1 RAM stick, no GPU if CPU has iGPU)\n' +
      '7. Reseat the CPU and check for bent pins\n' +
      '8. Test with a known working PSU if possible'
    );
  }
  if (lower.includes('overheat') || lower.includes('temperature') || lower.includes('hot') || lower.includes('thermal')) {
    return (
      'To address overheating issues:\n\n' +
      '1. Check that all fans are spinning properly\n' +
      '2. Clean dust from heatsinks, fans, and filters\n' +
      '3. Reapply thermal paste on the CPU (replace every 2-3 years)\n' +
      '4. Ensure proper cable management for airflow\n' +
      '5. Verify case has adequate intake/exhaust fans\n' +
      '6. Check if the CPU cooler is mounted correctly with even pressure\n' +
      '7. Monitor temperatures with HWMonitor or Core Temp\n\n' +
      'Safe temperature ranges:\n' +
      '- CPU idle: 30-45C | Load: 60-85C\n' +
      '- GPU idle: 30-45C | Load: 65-85C'
    );
  }
  if (lower.includes('blue screen') || lower.includes('bsod') || lower.includes('crash')) {
    return (
      'For blue screen/crash troubleshooting:\n\n' +
      'Hardware-related causes and fixes:\n' +
      '1. Run Windows Memory Diagnostic or MemTest86 to test RAM\n' +
      '2. Check storage health with CrystalDiskInfo\n' +
      '3. Ensure GPU drivers are from the manufacturer\'s website\n' +
      '4. Check for overheating (monitor temps under load)\n' +
      '5. Test PSU stability - failing PSUs can cause random crashes\n' +
      '6. Reseat all components (RAM, GPU, cables)\n' +
      '7. If overclocked, revert to stock settings'
    );
  }
  return (
    'For general hardware troubleshooting:\n\n' +
    '1. Identify the specific symptom (no power, no display, crashes, etc.)\n' +
    '2. Check all physical connections and cables\n' +
    '3. Test components individually when possible\n' +
    '4. Listen for unusual sounds (clicking HDD, coil whine, fan rattle)\n' +
    '5. Check system event logs for hardware errors\n' +
    '6. Update BIOS/firmware to latest stable version\n\n' +
    'Could you describe the specific issue you\'re experiencing?'
  );
};

const generateGeneralResponse = (lower) => {
  if (lower.includes('ssd') || lower.includes('hdd') || lower.includes('storage') || lower.includes('nvme')) {
    return (
      'Storage guide:\n\n' +
      'NVMe SSD (fastest):\n' +
      '- PCIe Gen 4: Up to 7,000 MB/s read (e.g., Samsung 990 Pro)\n' +
      '- PCIe Gen 3: Up to 3,500 MB/s read (e.g., Samsung 970 EVO Plus)\n\n' +
      'SATA SSD:\n' +
      '- Up to 550 MB/s read\n\n' +
      'HDD:\n' +
      '- Up to 200 MB/s read\n' +
      '- Best for: Mass storage, backups, media archives\n\n' +
      'For most users, a 1TB NVMe SSD as the primary drive with an ' +
      'optional HDD for mass storage is the best configuration.'
    );
  }
  if (lower.includes('cooling') || lower.includes('cooler') || lower.includes('fan')) {
    return (
      'Cooling solutions guide:\n\n' +
      'Air Cooling:\n' +
      '- Budget: Stock cooler / Cooler Master Hyper 212 (~\u20B11,700)\n' +
      '- Mid-range: Noctua NH-U12S / be quiet! Dark Rock 4 (~\u20B12,900-4,100)\n' +
      '- High-end: Noctua NH-D15 / Thermalright Peerless Assassin (~\u20B12,900-5,200)\n\n' +
      'AIO Liquid Cooling:\n' +
      '- 240mm: Good for mid-range CPUs (~\u20B14,100-5,800)\n' +
      '- 280mm: Great balance of performance and noise (~\u20B15,200-7,500)\n' +
      '- 360mm: Best for high-end/overclocked CPUs (~\u20B15,800-11,600)\n\n' +
      'Air coolers are generally more reliable with no pump failure risk.'
    );
  }
  return (
    'I\'d be happy to help with your PC hardware question. I can assist with:\n\n' +
    '- Checking hardware compatibility\n' +
    '- Recommending components for your budget\n' +
    '- Troubleshooting hardware issues\n' +
    '- Explaining PC component specifications\n' +
    '- Build advice and optimization tips\n\n' +
    'Could you provide more details about what you\'d like to know?'
  );
};

export const generateResponse = (prompt) => {
  if (!isHardwareRelated(prompt)) {
    return RESTRICTION_MESSAGE;
  }

  const lower = prompt.toLowerCase();

  if (['compatible', 'compatibility', 'work with', 'pair with', 'match'].some((w) => lower.includes(w))) {
    return generateCompatibilityResponse(lower);
  }
  if (['recommend', 'suggestion', 'best', 'budget', 'which', 'what should'].some((w) => lower.includes(w))) {
    return generateRecommendationResponse(lower);
  }
  if (['troubleshoot', 'problem', 'issue', 'not working', 'error', 'crash', 'freeze', 'boot', 'no display', 'black screen', 'blue screen', 'overheat', 'noise', 'loud', 'smoke', 'beep'].some((w) => lower.includes(w))) {
    return generateTroubleshootingResponse(lower);
  }

  return generateGeneralResponse(lower);
};
