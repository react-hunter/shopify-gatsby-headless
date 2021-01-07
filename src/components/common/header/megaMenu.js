import React from 'react';
// import { Link } from 'gatsby';
// import { commonData } from '../../../data/common';

const megaMenu = ({ path }) => {
    return (
        <>
        { /*
        <div className="menu-category-panel">
            <div className="menu-panel" id="BestSellers">
                {% for block in section.blocks %}
                    {% if block.type == 'BestSellersCategory' %}
                    <div className="menu-panel_linklist">
                        <span className="menu-panel_linklist_title">{{ linklists[block.settings.best_seller_panel_links].title }}</span>
                        {% for link in linklists[block.settings.best_seller_panel_links].links %}
                            <a className="menu-panel_linklist_link" href="{{ link.url }}">{{ link.title }}</a>
                        {% endfor %}
                    </div>
                    {% endif %}
                {% endfor %}
                <div className="menu-panel_image_wrapper">
                {% for block in section.blocks %}
                    {% if block.type == 'MegaMenuImage' %}
                    {% if block.settings.mega_menu_image_name == 'BestSellers' %}
                    <a href="{{ block.settings.mega_menu_image_link }}">
                        <img className="mega-menu_image" src="{{block.settings.mega_menu_image | img_url: '500x'}}">
                        <span className="image_status">{{ block.settings.mega_menu_image_status }}</span>
                    </a>
                    {% endif %}
                    {% endif %}
                {% endfor %}
                </div> 
            </div>
            <div className="menu-panel" id="NewArrivals">
                {% for block in section.blocks %}
                    {% if block.type == 'NewArrivalsCategory' %}
                    <div className="menu-panel_linklist">
                        <span className="menu-panel_linklist_title">{{ linklists[block.settings.new_arrivals_panel_links].title }}</span>
                        {% for link in linklists[block.settings.new_arrivals_panel_links].links %}
                            <a className="menu-panel_linklist_link" href="{{ link.url }}">{{ link.title }}</a>
                        {% endfor %}
                    </div>
                    {% endif %}
                {% endfor %}
                <div className="menu-panel_image_wrapper">
                {% for block in section.blocks %}
                    {% if block.type == 'MegaMenuImage' %}
                    {% if block.settings.mega_menu_image_name == 'NewArrivals' %}
                    <a href="{{ block.settings.mega_menu_image_link }}">
                    <img className="mega-menu_image" src="{{block.settings.mega_menu_image | img_url: '150x'}}">
                    <span className="image_status">{{ block.settings.mega_menu_image_status }}</span>
                    </a>
                    {% endif %}
                    {% endif %}
                {% endfor %}
                </div> 
            </div>
            <div className="menu-panel" id="Occasions">
                {% for block in section.blocks %}
                    {% if block.type == 'OccasionsCategory' %}
                    <div className="menu-panel_linklist">
                        <span className="menu-panel_linklist_title">{{ linklists[block.settings.occasions_panel_links].title }}</span>
                        {% for link in linklists[block.settings.occasions_panel_links].links %}
                            <a className="menu-panel_linklist_link" href="{{ link.url }}">{{ link.title }}</a>
                        {% endfor %}
                    </div>
                    {% endif %}
                {% endfor %}
                <div className="menu-panel_image_wrapper">
                {% for block in section.blocks %}
                    {% if block.type == 'MegaMenuImage' %}
                    {% if block.settings.mega_menu_image_name == 'Occasions' %}
                    <a href="{{ block.settings.mega_menu_image_link }}">
                    <img className="mega-menu_image" src="{{block.settings.mega_menu_image | img_url: '150x'}}">
                    <span className="image_status">{{ block.settings.mega_menu_image_status }}</span>
                    </a>
                    {% endif %}
                    {% endif %}
                {% endfor %}
                </div> 
                </div>
            </div>
        </div>

        */}
        </>
    )
}

export default megaMenu