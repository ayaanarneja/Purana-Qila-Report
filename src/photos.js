const U = import.meta.glob('./photos/*.jpg', { eager: true, query: '?url', import: 'default' });
// id: [title, caption, related claim (claim audit number), object-position]
// f0-f5: the photographs of the first report build (Cover, Fig. 1-5). d01-d15: the photo log (D1-D15).
const META = {
  f0: ['Ayaan and Aviral at Purana Qila', 'The two visiting members at the ruined gateway, 22 October 2026.', '', '50% 40%'],
  f1: ['Main gateway and bastions', 'Main gateway with flanking bastions: red sandstone, pointed arch, star motifs, rubble-stone towers.', '1, 2', '50% 45%'],
  f2: ['Qila-i-Kuhna Mosque', 'Five-arched façade with a central dome, red sandstone and contrasting stone and marble detailing.', '11', '50% 50%'],
  f3: ['Sher Mandal', 'Octagonal red-sandstone tower crowned by a chhatri, seen from the surrounding lawn.', '10', '50% 50%'],
  f4: ['Ruined multi-storey structure', 'Two chhatris and arched openings; exposed rubble masonry in the foreground.', '', '50% 40%'],
  f5: ['Landscaped pathway', 'A path through the fort grounds with a small arcaded stone structure beside it.', '', '50% 50%'],
  d01: ['Information board, Qila-i-Kuhna Masjid', 'Bilingual board beside the mosque. It states the mosque was built by Sher Shah in 1541, with a prayer hall of 51 m by 15 m and a facade 16.5 m high at the centre. Processed copy: its Hindi lettering differs from the original photograph, so rely on the English text.', '11', '50% 40%'],
  d02: ['Central arch of the mosque facade', 'Red sandstone pointed arch with carved borders, marble inlay and a scalloped inner arch. Processed copy.', '11', '50% 45%'],
  d03: ['Domed building across the lawn', 'A single dome with a finial behind a stone wall, and a red sandstone corner turret at right. Identified on the visit as the Qila-i-Kuhna mosque.', '11', '50% 50%'],
  d04: ['Sher Mandal', 'Double-storeyed octagonal red sandstone tower on a raised plinth, with a dome and white inlay panels on the upper balustrade.', '10', '50% 38%'],
  d05: ['Sher Mandal through the trees', 'The tower seen from the lawn to the side, showing how it sits in the grounds.', '10', '50% 50%'],
  d06: ['Bada Darwaza', 'Gateway between two round stone bastions, with six-pointed star motifs in the inlaid spandrels and small pavilions on the upper balconies. INTACH dates the gate to 1533/34.', '1, 2', '50% 50%'],
  d07: ['Gate and bastions from below', 'The same gateway from a lower angle: rubble-faced round bastions flank a red sandstone central block.', '1, 2', '50% 38%'],
  d08: ['Ruined stone building with two chhatris', 'Rubble and dressed-stone walls with arched openings and two small domed pavilions on the roofline. The ground in front is lowered and ramped. Processed copy.', '', '50% 50%'],
  d09: ['Vaulted bay', 'Pointed arches in stone, with a brick-filled niche at the rear and weathering on the vault. Processed copy.', '', '50% 50%'],
  d10: ['Avenue and flagpole', 'A hedge-lined avenue leading to a flagpole inside the grounds.', '', '50% 50%'],
  d11: ['Path and arcaded structure', 'A concrete path through the grounds towards a small arcaded stone structure.', '', '50% 50%'],
  d12: ['The authors on the visit', 'Taken in the grounds, with a red sandstone tower in the background.', '', '50% 40%'],
  d13: ['The authors at the ruins', 'In front of a ruined masonry block with arched openings.', '', '50% 40%'],
  d14: ['The authors at a gateway', 'In front of a red sandstone gateway, with a flagpole visible through the arch.', '', '50% 60%'],
  d15: ['Site plan board', 'The plan displayed at the fort, labelling the Bada Darwaza, Humayun Darwaza, Talaab Darwaza, the masjid, Sher Mandal, Darshani Mahal, the archaeological museum, the moat area and the ticket counter.', '', '50% 50%'],
};
export const P = {};
Object.entries(META).forEach(([id, [t, cap, claim, pos]], n) => {
  const f = id[0] === 'f';
  P[id] = { id, set: f ? 'f' : 'd', fig: f ? (id === 'f0' ? 'Cover' : `Fig. ${id.slice(1)}`) : `D${parseInt(id.slice(1), 10)}`, t, cap, claim, pos, src: U[`./photos/${id}.jpg`] };
});
export const ALL = Object.values(P);
