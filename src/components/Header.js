const Header = ({ name, toggleWindow }) => {
  return (
    <header className="header">
        <div className="header__titile"> { name ? name : "dApp" } </div>
        <button className="header__action"
                onClick={() => toggleWindow(true)}>Add tast "+"</button>
      </header>
  )
}

export default Header;