package com.chocolates.web.service;

import com.chocolates.web.entity.NavigationItem;
import com.chocolates.web.entity.NavigationMenu;
import com.chocolates.web.repository.NavigationItemRepository;
import com.chocolates.web.repository.NavigationMenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NavigationService {

    private final NavigationMenuRepository navigationMenuRepository;
    private final NavigationItemRepository navigationItemRepository;

    public NavigationMenu getMenuByLocation(String location) {
        return navigationMenuRepository.findByLocation(location)
                .orElseThrow(() -> new RuntimeException("Menú no encontrado en ubicación: " + location));
    }

    public List<NavigationMenu> getAllMenus() {
        return navigationMenuRepository.findAll();
    }

    @Transactional
    public NavigationMenu createMenu(String name, String location) {
        NavigationMenu menu = NavigationMenu.builder()
                .name(name)
                .location(location)
                .active(true)
                .build();
        return navigationMenuRepository.save(menu);
    }

    @Transactional
    public NavigationMenu updateMenu(Long id, String name, String location) {
        NavigationMenu menu = navigationMenuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menú no encontrado con id: " + id));
        menu.setName(name);
        menu.setLocation(location);
        return navigationMenuRepository.save(menu);
    }

    @Transactional
    public NavigationItem addItem(Long menuId, Map<String, Object> itemData) {
        NavigationItem item = NavigationItem.builder()
                .menuId(menuId)
                .title((String) itemData.get("title"))
                .url((String) itemData.get("url"))
                .target((String) itemData.getOrDefault("target", "_self"))
                .icon((String) itemData.get("icon"))
                .parentId(itemData.get("parentId") != null ? ((Number) itemData.get("parentId")).longValue() : null)
                .sortOrder(itemData.get("sortOrder") != null ? ((Number) itemData.get("sortOrder")).intValue() : 0)
                .active(itemData.get("active") != null ? (Boolean) itemData.get("active") : true)
                .build();
        NavigationItem saved = navigationItemRepository.save(item);
        NavigationMenu menu = navigationMenuRepository.findById(menuId)
                .orElseThrow(() -> new RuntimeException("Menú no encontrado con id: " + menuId));
        if (menu.getItems() != null) {
            menu.getItems().add(saved);
        }
        return saved;
    }

    @Transactional
    public NavigationItem updateItem(Long itemId, Map<String, Object> itemData) {
        NavigationItem item = navigationItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item de menú no encontrado con id: " + itemId));
        if (itemData.containsKey("title")) item.setTitle((String) itemData.get("title"));
        if (itemData.containsKey("url")) item.setUrl((String) itemData.get("url"));
        if (itemData.containsKey("target")) item.setTarget((String) itemData.get("target"));
        if (itemData.containsKey("icon")) item.setIcon((String) itemData.get("icon"));
        if (itemData.containsKey("sortOrder")) item.setSortOrder(((Number) itemData.get("sortOrder")).intValue());
        if (itemData.containsKey("active")) item.setActive((Boolean) itemData.get("active"));
        return navigationItemRepository.save(item);
    }

    @Transactional
    public void removeItem(Long itemId) {
        NavigationItem item = navigationItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item de menú no encontrado con id: " + itemId));
        navigationItemRepository.delete(item);
    }
}
