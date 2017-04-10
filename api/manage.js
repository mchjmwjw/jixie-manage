const _materials = [
    { phid: 1, m_no: '10001', m_name: '铁板', m_unit: '吨', m_amount: 12, m_kind: '类别1', m_remark: '无' },
    { phid: 1, m_no: '10002', m_name: '发动机', m_unit: '台', m_amount: 10, m_kind: '类别2', m_remark: '无' },
    { phid: 1, m_no: '10003', m_name: '扳手', m_unit: '个', m_amount: 120, m_kind: '类别3', m_remark: '无' },
    { phid: 1, m_no: '10004', m_name: '螺钉', m_unit: '盒', m_amount: 12, m_kind: '类别3', m_remark: '无' },
    { phid: 1, m_no: '10005', m_name: '手套', m_unit: '打', m_amount: 230, m_kind: '类别3', m_remark: '无' },
    { phid: 1, m_no: '10006', m_name: '切割机', m_unit: '台', m_amount: 5, m_kind: '类别4', m_remark: '无' }
];

function getMaterials(cb) {
	return cb(_materials);
}

export default {
	getMaterials
};