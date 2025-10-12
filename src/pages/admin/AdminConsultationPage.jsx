import { useState, useEffect } from 'react'
import { consultationService } from '../../services'
import AdminLayout from '../../components/admin/AdminLayout'
import * as XLSX from 'xlsx'

function AdminConsultationPage({ darkMode = false }) {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')

  // Export modal
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportConsultations, setExportConsultations] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [exportSearch, setExportSearch] = useState('')
  const [exportStatusFilter, setExportStatusFilter] = useState('')
  const [exportSortBy, setExportSortBy] = useState('createdAt')
  const [exportSortOrder, setExportSortOrder] = useState('desc')
  const [exportLoading, setExportLoading] = useState(false)

  // Notes editing
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [editingNoteValue, setEditingNoteValue] = useState('')

  useEffect(() => {
    fetchConsultations()
  }, [pagination.page, search, statusFilter, sortBy, sortOrder])

  const fetchConsultations = async () => {
    try {
      setLoading(true)
      const response = await consultationService.getAllConsultations({
        page: pagination.page,
        limit: pagination.limit,
        search,
        status: statusFilter,
        sortBy,
        sortOrder
      })
      setConsultations(response.data.items)
      setPagination(prev => ({
        ...prev,
        page: response.data.currentPage,
        total: response.data.total,
        totalPages: response.data.totalPages
      }))
    } catch (error) {
      console.error('Error fetching consultations:', error)
      alert('Không thể tải danh sách yêu cầu tư vấn')
    } finally {
      setLoading(false)
    }
  }

  const STATUS_OPTIONS = {
    REQUEST: 'Yêu cầu mới',
    CALLED_ADVISE: 'Đã gọi - Hợp tác',
    CALLED_REFUSE: 'Đã gọi - Từ chối'
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'REQUEST': return '#ffa500'
      case 'CALLED_ADVISE': return '#28a745'
      case 'CALLED_REFUSE': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await consultationService.updateConsultationStatus(id, newStatus)
      alert('Đã cập nhật trạng thái thành công!')
      fetchConsultations()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Không thể cập nhật trạng thái')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa yêu cầu này?')) {
      return
    }

    try {
      await consultationService.deleteConsultation(id)
      alert('Đã xóa thành công!')
      fetchConsultations()
    } catch (error) {
      console.error('Error deleting consultation:', error)
      alert('Không thể xóa yêu cầu tư vấn')
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }))
    }
  }

  const handleSearchChange = (value) => {
    setSearch(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleFilterChange = (value) => {
    setStatusFilter(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleSortChange = (field, order) => {
    setSortBy(field)
    setSortOrder(order)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  // Notes editing functions
  const handleNoteDoubleClick = (consultation) => {
    setEditingNoteId(consultation._id)
    setEditingNoteValue(consultation.notes || '')
  }

  const handleNoteSave = async (id) => {
    try {
      await consultationService.updateConsultationNotes(id, editingNoteValue)
      setEditingNoteId(null)
      fetchConsultations()
    } catch (error) {
      console.error('Error updating notes:', error)
      alert('Không thể cập nhật ghi chú')
    }
  }

  const handleNoteKeyDown = (e, id) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleNoteSave(id)
    } else if (e.key === 'Escape') {
      setEditingNoteId(null)
    }
  }

  // Export modal functions
  const openExportModal = async () => {
    setShowExportModal(true)
    setSelectedIds([])
    await fetchExportConsultations()
  }

  const fetchExportConsultations = async () => {
    try {
      setExportLoading(true)
      const response = await consultationService.getAllConsultations({
        page: 1,
        limit: 1000, // Get all
        search: exportSearch,
        status: exportStatusFilter,
        sortBy: exportSortBy,
        sortOrder: exportSortOrder
      })
      setExportConsultations(response.data.items)
    } catch (error) {
      console.error('Error fetching export consultations:', error)
      alert('Không thể tải danh sách yêu cầu tư vấn')
    } finally {
      setExportLoading(false)
    }
  }

  useEffect(() => {
    if (showExportModal) {
      fetchExportConsultations()
    }
  }, [exportSearch, exportStatusFilter, exportSortBy, exportSortOrder])

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(exportConsultations.map(item => item._id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const exportToExcel = () => {
    const dataToExport = exportConsultations.filter(item => selectedIds.includes(item._id))

    if (dataToExport.length === 0) {
      alert('Vui lòng chọn ít nhất một yêu cầu để xuất')
      return
    }

    // Chuẩn bị dữ liệu cho Excel
    const excelData = dataToExport.map((item, index) => ({
      'STT': index + 1,
      'Họ và tên': item.fullName,
      'Số điện thoại': item.phoneNumber,
      'Trạng thái': STATUS_OPTIONS[item.status] || item.status,
      'Ghi chú': item.notes || '',
      'Ngày gửi': new Date(item.createdAt).toLocaleString('vi-VN'),
      'Cập nhật lần cuối': new Date(item.updatedAt).toLocaleString('vi-VN')
    }))

    // Tạo workbook và worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(excelData)

    // Điều chỉnh độ rộng cột
    ws['!cols'] = [
      { wch: 5 },   // STT
      { wch: 25 },  // Họ và tên
      { wch: 15 },  // Số điện thoại
      { wch: 20 },  // Trạng thái
      { wch: 40 },  // Ghi chú
      { wch: 20 },  // Ngày gửi
      { wch: 20 }   // Cập nhật lần cuối
    ]

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Yêu cầu tư vấn')

    // Xuất file
    const fileName = `yeu-cau-tu-van-${new Date().toISOString().split('T')[0]}.xlsx`
    XLSX.writeFile(wb, fileName)
    
    setShowExportModal(false)
    alert(`Đã xuất ${dataToExport.length} yêu cầu ra file Excel`)
  }

  return (
    <AdminLayout>
      <div style={{ padding: '30px' }}>
        {/* Header */}
        <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>
            Yêu cầu tư vấn
          </h1>
          <p style={{ margin: '5px 0 0 0', color: darkMode ? '#999' : '#666' }}>
            Quản lý các yêu cầu tư vấn từ khách hàng
          </p>
        </div>
        <button
          onClick={openExportModal}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s'
          }}
        >
          <span>📊</span>
          Xuất Excel
        </button>
      </div>

      {/* Filters */}
      <div style={{
        background: darkMode ? '#1a1a1a' : '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          style={{
            flex: 1,
            minWidth: '250px',
            padding: '10px 15px',
            border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`,
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            background: darkMode ? '#0f0f0f' : '#fff',
            color: darkMode ? '#fff' : '#333'
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
          style={{
            padding: '10px 15px',
            border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`,
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            cursor: 'pointer',
            background: darkMode ? '#0f0f0f' : '#fff',
            color: darkMode ? '#fff' : '#333'
          }}
        >
          <option value="">Tất cả trạng thái</option>
          {Object.entries(STATUS_OPTIONS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-')
            handleSortChange(field, order)
          }}
          style={{
            padding: '10px 15px',
            border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`,
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            cursor: 'pointer',
            background: darkMode ? '#0f0f0f' : '#fff',
            color: darkMode ? '#fff' : '#333'
          }}
        >
          <option value="createdAt-desc">Ngày tạo (Mới nhất)</option>
          <option value="createdAt-asc">Ngày tạo (Cũ nhất)</option>
          <option value="updatedAt-desc">Cập nhật (Mới nhất)</option>
          <option value="updatedAt-asc">Cập nhật (Cũ nhất)</option>
        </select>
      </div>

      {/* Table */}
      <div style={{
        background: darkMode ? '#1a1a1a' : '#fff',
        borderRadius: '12px',
        boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {loading ? (
          <div style={{
            padding: '60px',
            textAlign: 'center',
            color: darkMode ? '#999' : '#666'
          }}>
            Đang tải...
          </div>
        ) : consultations.length === 0 ? (
          <div style={{
            padding: '60px',
            textAlign: 'center',
            color: darkMode ? '#999' : '#666'
          }}>
            Chưa có yêu cầu tư vấn nào
          </div>
        ) : (
          <>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff'
                }}>
                  <th style={tableHeaderStyle}>STT</th>
                  <th style={tableHeaderStyle}>Họ và tên</th>
                  <th style={tableHeaderStyle}>Số điện thoại</th>
                  <th style={tableHeaderStyle}>Trạng thái</th>
                  <th style={tableHeaderStyle}>Ghi chú</th>
                  <th style={tableHeaderStyle}>Ngày gửi</th>
                  <th style={tableHeaderStyle}>Cập nhật</th>
                  <th style={tableHeaderStyle}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((item, index) => (
                  <tr
                    key={item._id}
                    style={{
                      borderBottom: `1px solid ${darkMode ? '#333' : '#f0f0f0'}`,
                      transition: 'background 0.2s',
                      background: darkMode ? '#1a1a1a' : 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? '#222' : '#f8f9fa'}
                    onMouseLeave={(e) => e.currentTarget.style.background = darkMode ? '#1a1a1a' : 'transparent'}
                  >
                    <td style={{...tableCellStyle, color: darkMode ? '#ccc' : '#333'}}>
                      {(pagination.page - 1) * pagination.limit + index + 1}
                    </td>
                    <td style={{...tableCellStyle, color: darkMode ? '#ccc' : '#333'}}>{item.fullName}</td>
                    <td style={{...tableCellStyle, color: darkMode ? '#ccc' : '#333'}}>{item.phoneNumber}</td>
                    <td style={tableCellStyle}>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: `2px solid ${getStatusColor(item.status)}`,
                          background: `${getStatusColor(item.status)}20`,
                          color: getStatusColor(item.status),
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        {Object.entries(STATUS_OPTIONS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td 
                      style={{
                        ...tableCellStyle, 
                        color: darkMode ? '#ccc' : '#333',
                        cursor: 'text',
                        maxWidth: '300px'
                      }}
                      onDoubleClick={() => handleNoteDoubleClick(item)}
                      title="Double click để chỉnh sửa"
                    >
                      {editingNoteId === item._id ? (
                        <textarea
                          value={editingNoteValue}
                          onChange={(e) => setEditingNoteValue(e.target.value)}
                          onBlur={() => handleNoteSave(item._id)}
                          onKeyDown={(e) => handleNoteKeyDown(e, item._id)}
                          autoFocus
                          style={{
                            width: '100%',
                            minHeight: '60px',
                            padding: '8px',
                            border: `2px solid ${darkMode ? '#667eea' : '#667eea'}`,
                            borderRadius: '6px',
                            fontSize: '13px',
                            outline: 'none',
                            background: darkMode ? '#0f0f0f' : '#fff',
                            color: darkMode ? '#fff' : '#333',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                          }}
                        />
                      ) : (
                        <div style={{
                          minHeight: '20px',
                          padding: '4px',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word'
                        }}>
                          {item.notes || (
                            <span style={{ 
                              color: darkMode ? '#666' : '#999', 
                              fontStyle: 'italic' 
                            }}>
                              Double click để thêm ghi chú...
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td style={{...tableCellStyle, color: darkMode ? '#ccc' : '#333'}}>
                      {new Date(item.createdAt).toLocaleString('vi-VN')}
                    </td>
                    <td style={{...tableCellStyle, color: darkMode ? '#ccc' : '#333'}}>
                      {new Date(item.updatedAt).toLocaleString('vi-VN')}
                    </td>
                    <td style={tableCellStyle}>
                      <button
                        onClick={() => handleDelete(item._id)}
                        style={{
                          padding: '6px 16px',
                          background: '#ff4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#cc0000'}
                        onMouseLeave={(e) => e.target.style.background = '#ff4444'}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div style={{
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: `1px solid ${darkMode ? '#333' : '#f0f0f0'}`
            }}>
              <div style={{ color: darkMode ? '#999' : '#666', fontSize: '14px' }}>
                Hiển thị {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} trong tổng số {pagination.total} yêu cầu
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  style={{
                    padding: '8px 16px',
                    background: pagination.page === 1 ? (darkMode ? '#333' : '#f0f0f0') : '#667eea',
                    color: pagination.page === 1 ? '#999' : '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: pagination.page === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Trước
                </button>
                <div style={{
                  padding: '8px 16px',
                  background: darkMode ? '#222' : '#f8f9fa',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: darkMode ? '#ccc' : '#333'
                }}>
                  {pagination.page} / {pagination.totalPages}
                </div>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  style={{
                    padding: '8px 16px',
                    background: pagination.page === pagination.totalPages ? (darkMode ? '#333' : '#f0f0f0') : '#667eea',
                    color: pagination.page === pagination.totalPages ? '#999' : '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: pagination.page === pagination.totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Sau
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: darkMode ? '#1a1a1a' : '#fff',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px',
              borderBottom: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>
                Chọn yêu cầu để xuất Excel
              </h2>
              <button
                onClick={() => setShowExportModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: darkMode ? '#999' : '#666'
                }}
              >
                ×
              </button>
            </div>

            {/* Filters */}
            <div style={{
              padding: '15px 20px',
              borderBottom: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={exportSearch}
                onChange={(e) => setExportSearch(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '8px 12px',
                  border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  outline: 'none',
                  background: darkMode ? '#0f0f0f' : '#fff',
                  color: darkMode ? '#fff' : '#333'
                }}
              />
              <select
                value={exportStatusFilter}
                onChange={(e) => setExportStatusFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  outline: 'none',
                  cursor: 'pointer',
                  background: darkMode ? '#0f0f0f' : '#fff',
                  color: darkMode ? '#fff' : '#333'
                }}
              >
                <option value="">Tất cả trạng thái</option>
                {Object.entries(STATUS_OPTIONS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <select
                value={`${exportSortBy}-${exportSortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-')
                  setExportSortBy(field)
                  setExportSortOrder(order)
                }}
                style={{
                  padding: '8px 12px',
                  border: `2px solid ${darkMode ? '#333' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  outline: 'none',
                  cursor: 'pointer',
                  background: darkMode ? '#0f0f0f' : '#fff',
                  color: darkMode ? '#fff' : '#333'
                }}
              >
                <option value="createdAt-desc">Ngày tạo (Mới nhất)</option>
                <option value="createdAt-asc">Ngày tạo (Cũ nhất)</option>
                <option value="updatedAt-desc">Cập nhật (Mới nhất)</option>
                <option value="updatedAt-asc">Cập nhật (Cũ nhất)</option>
              </select>
            </div>

            {/* Table */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              padding: '0 20px'
            }}>
              {exportLoading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: darkMode ? '#999' : '#666' }}>
                  Đang tải...
                </div>
              ) : exportConsultations.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: darkMode ? '#999' : '#666' }}>
                  Không tìm thấy yêu cầu nào
                </div>
              ) : (
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginTop: '10px'
                }}>
                  <thead>
                    <tr style={{ background: darkMode ? '#222' : '#f8f9fa' }}>
                      <th style={{ ...tableHeaderStyle, position: 'sticky', top: 0, background: darkMode ? '#222' : '#f8f9fa', color: darkMode ? '#ccc' : '#333' }}>
                        <input
                          type="checkbox"
                          checked={selectedIds.length === exportConsultations.length && exportConsultations.length > 0}
                          onChange={handleSelectAll}
                          style={{ cursor: 'pointer' }}
                        />
                      </th>
                      <th style={{ ...tableHeaderStyle, position: 'sticky', top: 0, background: darkMode ? '#222' : '#f8f9fa', color: darkMode ? '#ccc' : '#333' }}>Họ và tên</th>
                      <th style={{ ...tableHeaderStyle, position: 'sticky', top: 0, background: darkMode ? '#222' : '#f8f9fa', color: darkMode ? '#ccc' : '#333' }}>Số điện thoại</th>
                      <th style={{ ...tableHeaderStyle, position: 'sticky', top: 0, background: darkMode ? '#222' : '#f8f9fa', color: darkMode ? '#ccc' : '#333' }}>Trạng thái</th>
                      <th style={{ ...tableHeaderStyle, position: 'sticky', top: 0, background: darkMode ? '#222' : '#f8f9fa', color: darkMode ? '#ccc' : '#333' }}>Ngày gửi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exportConsultations.map((item) => (
                      <tr
                        key={item._id}
                        style={{
                          borderBottom: `1px solid ${darkMode ? '#333' : '#f0f0f0'}`,
                          background: selectedIds.includes(item._id) ? (darkMode ? '#2a2a2a' : '#f0f8ff') : 'transparent'
                        }}
                      >
                        <td style={{ ...tableCellStyle, textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(item._id)}
                            onChange={() => handleSelectOne(item._id)}
                            style={{ cursor: 'pointer' }}
                          />
                        </td>
                        <td style={{...tableCellStyle, color: darkMode ? '#ccc' : '#333'}}>{item.fullName}</td>
                        <td style={{...tableCellStyle, color: darkMode ? '#ccc' : '#333'}}>{item.phoneNumber}</td>
                        <td style={tableCellStyle}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            background: `${getStatusColor(item.status)}20`,
                            color: getStatusColor(item.status),
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {STATUS_OPTIONS[item.status]}
                          </span>
                        </td>
                        <td style={{...tableCellStyle, color: darkMode ? '#ccc' : '#333'}}>
                          {new Date(item.createdAt).toLocaleString('vi-VN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '15px 20px',
              borderTop: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ color: darkMode ? '#999' : '#666', fontSize: '14px' }}>
                Đã chọn: {selectedIds.length} / {exportConsultations.length}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setShowExportModal(false)}
                  style={{
                    padding: '10px 20px',
                    background: darkMode ? '#333' : '#f0f0f0',
                    color: darkMode ? '#ccc' : '#333',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Hủy
                </button>
                <button
                  onClick={exportToExcel}
                  disabled={selectedIds.length === 0}
                  style={{
                    padding: '10px 20px',
                    background: selectedIds.length === 0 ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: selectedIds.length === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  Xuất Excel ({selectedIds.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  )
}

const tableHeaderStyle = {
  padding: '16px',
  textAlign: 'left',
  fontSize: '14px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const tableCellStyle = {
  padding: '16px',
  fontSize: '14px'
}

export default AdminConsultationPage
