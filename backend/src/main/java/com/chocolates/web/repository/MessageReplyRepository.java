package com.chocolates.web.repository;

import com.chocolates.web.entity.MessageReply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageReplyRepository extends JpaRepository<MessageReply, Long> {
    List<MessageReply> findByMessageIdOrderByCreatedAtAsc(Long messageId);
}
