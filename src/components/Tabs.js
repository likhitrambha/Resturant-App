const Tabs = ({tabs, activeTab, setActiveTab}) => (
  <ul className="tabs">
    {tabs.map(tab => (
      <li key={tab.menu_category_id}>
        <button
          type="button"
          className={activeTab === tab.menu_category_id ? 'active' : ''}
          onClick={() => setActiveTab(tab.menu_category_id)}
        >
          {tab.menu_category}
        </button>
      </li>
    ))}
  </ul>
)

export default Tabs
