

const SkillShow: React.FC = () => {

    return (
        <div className="form-control py-6">
        <div className="input-group">
            <select id="selected" className="select select-bordered">
            <option disabled selected>Pick category</option>
            <option value={1} >Attack</option>
            <option value={2} >Defence</option>
            <option value={3} >Strength</option>
            <option value={4} >Constitution</option>
            <option value={5} >Ranged</option>
            <option value={6} >Prayer</option>
            <option value={7} >Magic</option>
            <option value={8} >Woodcutting</option>
            <option value={9} >Fletching</option>
            <option value={10} >Fishing</option>
            <option value={11} >Firemaking</option>
            <option value={12} >Crafting</option>
            <option value={13} >Smithing</option>
            <option value={14} >Mining</option>
            <option value={15} >Herblore</option>
            <option value={16} >Agility</option>
            <option value={17} >Thieving</option>
            <option value={18} >Slayer</option>
            <option value={19} >Farming</option>
            <option value={20} >Runecrafting</option>
            <option value={21} >Hunter</option>
            <option value={22} >Construction</option>
            <option value={23} >Summoning</option>
            <option value={24} >Dungeoneering</option>
            <option value={25} >Divination</option>
            <option value={26} >Invention</option>
            <option value={27} >Archaeology</option>
            </select>
            <button className="btn">Go</button>
        </div>
        </div>
    )
}

export default SkillShow;